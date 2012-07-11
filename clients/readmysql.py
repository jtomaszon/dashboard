#!/usr/bin/python
import sys,time
import redis
import MySQLdb

l=0
host="localhost"
user="co2Hiej3poh"
passwd="OhQuai2aGh6ve2th"


e=int(time.time())
commands = [['COM_DELETE', 0], ['COM_INSERT', 0], ['COM_SELECT', 0], ['COM_UPDATE', 0]]

r = redis.Redis("10.4.65.196")
p = r.pipeline()
m = MySQLdb.connect(host=host, user=user, passwd=passwd)

while True:
        cursor = m.cursor()
        #sql="show global status like 'Com_%';"
        sql="select * from information_schema.global_status where variable_name in ('Com_select', 'Com_insert', 'Com_update', 'Com_delete');"
        cursor.execute(sql)
        rst = cursor.fetchall()

        i = 0
        for command in commands:
                commands[i] = [command[0], r.get(command[0])];
                i = i+1;

        for key in rst:
                p.set(key[0], key[1])
        p.execute()

        i = 0
        for command in commands:
                commands[i] = [command[0], (int(r.get(command[0])) - int(command[1]))];
                i = i+1;

        result = str(commands[0][1])+","+str(commands[1][1])+","+str(commands[2][1])+","+str(commands[3][1])
        r.publish("mysqlStatus", result)

        time.sleep(1)