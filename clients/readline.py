#!/usr/bin/python
import sys,time
import redis

l=0
<<<<<<< HEAD
code200=0
code300=0
code500=0

=======
>>>>>>> 932320b89e44fe378c98800dc0ae5863318f0bfb
e=int(time.time())
r = redis.Redis("10.4.65.196")

for line in sys.stdin:
<<<<<<< HEAD
        ip, get, status, referer, other = line.split("\"",4)
        sts, bytes = status.strip().split(" ", 1)

        t = int(time.time())
        if "20" in sts : code200 +=1
        elif "30" in sts : code300 +=1
        elif "50" in sts : code500 +=1

        if t > e:
                e = t
                result = str(code200)+","+str(code300)+","+str(code500)
                r.publish("errors", result)
                code200=0
                code300=0
                code500=0
=======
	t = int(time.time())
	l += 1
	if t > e:
		e = t
		#print "\"PUBLISH 'ws' "+str(l)+"\""
		r.publish("ws", int(l))
		l = 0
>>>>>>> 932320b89e44fe378c98800dc0ae5863318f0bfb
