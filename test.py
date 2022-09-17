import GATetris
import Tetris


#print(Tetris.TetrisGame(True,True,False,0.14246, 0.15865, 0.23131, 0.56507, 0.45612).run())


#print(Tetris.TetrisGame(ai=True,ForceUI=True,wltop=0.7032,wlbot=0.56141,wb=0.27375,wh=0.39578,wgh=0.82356,maxmoves=500).run())

print(Tetris.TetrisGame(ai=True,ForceUI=True,NPK=True,wltop=0.760666,wlbot=0.55,wb=0.184483,wh=0.35663,wgh=0.510066).run())