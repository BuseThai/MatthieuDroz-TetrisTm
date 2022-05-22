import random


I=[
   [[1],
    [1],
    [1],
    [1]],
   [[1,1,1,1]],
   [[1],
    [1],
    [1],
    [1]],
   [[1,1,1,1]]
    ]

J=[[[2,0,0],
    [2,2,2]],
   [[2,2],
    [2,0],
    [2,0]],
   [[2,2,2],
    [0,0,2]],
   [[0,2],
    [0,2],
    [2,2]]
]
L=[[[3,0],
    [3,0],
    [3,3]],
   [[3,3,3],
    [3,0,0]],
   [[3,3],
    [0,3],
    [0,3]],
   [[0,0,3],
    [3,3,3]]
   ]
    
O=[
  [[4,4],
   [4,4]],
  
  [[4,4],
   [4,4]],
  
   [[4,4],
   [4,4]],
   
  [[4,4],
   [4,4]]
]
    
S=[[[0,5,5],
    [5,5,0]],
   [[5,0],
    [5,5],
    [0,5]],
   [[0,5,5],
    [5,5,0]],
   [[5,0],
    [5,5],
    [0,5]]
   ]
    
T=[[[0,6,0],
    [6,6,6]],
   [[6,0],
    [6,6],
    [6,0]],
   [[6,6,6],
    [0,6,0]],
   [[0,6],
    [6,6],
    [0,6]]
   ]
    
Z=[[[7,7,0],
    [0,7,7]],
   [[0,7],
    [7,7],
    [7,0]],
   [[7,7,0],
    [0,7,7]],
   [[0,7],
    [7,7],
    [7,0]]
   ]

# figtype= [J,L,O,I,Z,T,S]
figtype= [I,J,L,O,S,T,Z]


class Tetrimino:
    def __init__(self,x,y):
        self.x = x
        self.y = y
        self.fig = self.rndfig()
        self.rot = 0
    
    def rndfig(self):
        return figtype[random.randint(0,len(figtype)-1)]

    def getFig(self):
        return self.fig[self.rot]
    
    def rotate(self):
        if self.rot == 3:
            self.rot=0
        else:
            self.rot=self.rot+1

    def reverseRotate(self):
        if self.rot == 0:
            self.rot=3
        else:
            self.rot=self.rot-1
        

    

