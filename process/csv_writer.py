import time, threading
import csv
from random import randint

StartTime=time.time()

def action() :
    value = randint(-2048, 2048)
    print(value)

class setInterval :
    def __init__(self,interval,action) :
        self.interval=interval
        self.action=action
        self.stopEvent=threading.Event()
        thread=threading.Thread(target=self.__setInterval)
        thread.start()

    def __setInterval(self) :
        nextTime=time.time()+self.interval
        while not self.stopEvent.wait(nextTime-time.time()) :
            nextTime+=self.interval
            self.action()

    def cancel(self) :
        self.stopEvent.set()

# start action every 0.6s
inter=setInterval(0.001,action)

# will stop interval in 5s
t=threading.Timer(5,inter.cancel)
t.start()