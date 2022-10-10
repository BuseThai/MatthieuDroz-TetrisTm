import GATetris
import Tetris
from multiprocessing import Process,Value


#print(Tetris.TetrisGame(True,True,True,0.29049, 0.13933, 0.3061, 0.79654, 0.66342).run())

#print(Tetris.TetrisGame(ai=True,ForceUI=True,wltop=0.7032,wlbot=0.56141,wb=0.27375,wh=0.39578,wgh=0.82356,maxmoves=500).run())




#les saint params
#print(Tetris.TetrisGame(ai=True,ForceUI=True,NPK=False,wltop=1,wlbot=0.760666,wb=0.184483,wh=0.35663,wgh=0.510066).run())

print(Tetris.TetrisGame(True,True,True,1.29049, 0.13933, 0.3061, 0.79654, 0.66342).run())
#0.47448, 0.76863, 0.40721, 0.98878, 0.69878



"""
def FitnessIndividual(sc):
    fitscore =Tetris.TetrisGame(ai=True,ForceUI=False,NPK=True).run()
    sc.value+=fitscore

from multiprocessing import Process, freeze_support
if __name__ == '__main__':
    freeze_support()
    threads = list()

    sc = Value('i', 0)
    for i in range(0,100):
        x = Process(target=FitnessIndividual, args=(sc,))
        threads.append(x)
        x.start()


    for thread in threads:
        thread.join(timeout=60)

    print("average :",(sc.value/100))

"""

#0.29158, 0.14063, 0.3062, 0.79501, 0.66504
#print(Tetris.TetrisGame(ai=True,ForceUI=True,NPK=False,wltop=0.29158,wlbot=0.14063,wb=0.3062,wh=0.79501,wgh=0.66504).run())
#print(Tetris.TetrisGame().run())