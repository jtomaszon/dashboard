#!/usr/bin/ruby

require 'redis'
require 'socket'
require 'optparse'

@total = 0

OptionParser.new do |o|
  o.on('--debug') { |b| $debug = true }
  o.on('--syslog') { |b| $syslog = true }
  o.on('--interval=SECONDS') { |seconds| $interval = seconds.to_i }
  o.on('--host=HOST') { |host| @host = host }
  o.on('--port=PORT') { |port| @port = port }
  o.on('-h') { puts o; exit }
  o.parse!
end

def logger(msg)
  if defined? $debug
    puts "[ERROR]: Publisher #{msg}"
  end

  if defined? $syslog
    require 'syslog'
    Syslog.open("Publisher", Syslog::LOG_PID | Syslog::LOG_CONS) { |s| s.warning "#{msg}" } 
  end
end


def server

  socket = UDPSocket.new
  socket.setsockopt(Socket::SOL_SOCKET,Socket::SO_BROADCAST, 1)
  
  if not defined? @host
    @host = '127.0.0.1'
  end

  if not defined? @port
    @port = '3000'
  end

  begin
    socket.bind(@host, @port)
  rescue
    logger "Address already in use [ PORT: #{port} ]"
    exit
  end

  @listener = Thread.new do
    loop do
      data, addr = socket.recvfrom(1024)
      @total += data.to_i
      logger "data received: #{data}"
    end

  end

end

def publisher

  begin
    @redis = Redis.new(:host => '127.0.0.1', :post => 6379, :timeout => 0)
    @redis.inspect
  rescue
    logger "Redis down"
    exit
  end

  loop do
    sleep($interval)

    begin
      @redis.inspect
      pub = @redis.publish "ws", @total
      logger "Publish message: #{@total}" if pub
    rescue
      logger "ERROR: Can not publish right now"
    end
    
    @total = 0
  end

end

trap("SIGINT") do
  puts "Stopping server..."
  Thread.kill(@listener)
  exit
end

server
publisher

sleep
