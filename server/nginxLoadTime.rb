#!/usr/bin/ruby
require 'redis'
require 'em-websocket'

$syslog = true
SOCKETS = []

def logger(msg)
  if defined? $debug
    puts "[INFO]: Websocket #{msg}"
  end

  if defined? $syslog
    require 'syslog'
    Syslog.open("Websocket", Syslog::LOG_PID | Syslog::LOG_CONS) { |s| s.warning "#{msg}" } 
  end
end

def listener
  Thread.new do
    EventMachine.run do
      EventMachine::WebSocket.start(:host => '0.0.0.0', :port => 8084) do |ws|
        ws.onopen do
          logger "Creating socket"
          SOCKETS << ws
        end

        ws.onclose do
          logger "Closing socket"
          SOCKETS.delete ws
        end
      end
    end
  end
end

def sender
  @redis = Redis.new(:host => '127.0.0.1', :post => 6379)

  Thread.new do
    @redis.subscribe('nginxLoadTime') do |on|
      on.message do |chan, msg|
        logger "sending message: #{msg}"
        SOCKETS.each {|s| s.send msg}
      end
    end
  end
end

trap("SIGINT") do
  puts "Stopping server..."
  Thread.kill(@listener)
  exit
end

listener
sender

sleep
