#!/usr/bin/python
import sys,time
import redis

l=0
e=int(time.time())
r = redis.Redis("10.4.65.196")

for line in sys.stdin:
	t = int(time.time())
	l += 1
	if t > e:
		e = t
		#print "\"PUBLISH 'ws' "+str(l)+"\""
		r.publish("ws", int(l))
		l = 0
