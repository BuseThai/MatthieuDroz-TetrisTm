from http.client import OK
from re import X


from os import environ
environ['PYGAME_HIDE_SUPPORT_PROMPT'] = '1'

import pygame



import Tetriminos
import numpy as np
import time



stat=0
nbstat=0




class TetrisGame:
    def __init__(self,ai=False,ForceUI=False,NPK=True,wltop=1,wlbot=1,wb=1,wh=1,wgh=1,maxmoves=-1):
        self.ai = ai
        self.npk = NPK
        self.forceui = ForceUI
        self.weightlinetop = wltop
        self.weightlinebottom = wlbot
        self.weightbump = wb
        self.weighthole = wh
        self.weightgheight =wgh
        self.params = 3
        self.maxmoves = maxmoves
        self.start = True
        self.stop = False
        self.case_x = 10
        self.case_y = 22
        self.case_size = 40
        self.grid= [[0]*self.case_x for i in range(self.case_y)]
        self.clock = 0
        self.falltime = 0
        self.fallspeed = 0.2
        self.speedFig = False
        self.fallfig = None
        self.score = 0
        self.rowclear=0
        self.nextpiece = Tetriminos.Tetrimino(4,0)
        self.avr = [0,0]
        self.mvs=0


    def run(self):
        if self.ai==True and self.forceui==False:
            pass


        else:
            pygame.init()
            self.clock = pygame.time.Clock()
            self.screen =pygame.display.set_mode((self.case_x*self.case_size,self.case_y*self.case_size))


        self.intFig()
        self.convertFigGrid(self.fallfig)
        self.render()
        self.runAI()

         # x = threading.Thread(target=self.runAI)
        # x.start()
        if self.ai == True:
            self.loopai()
        else:
            self.loopplayer()
        return self.score




    def loopai(self):
            
            self.fallspeed=0.002
            while self.stop==False:
                self.falltime+=1

                if self.forceui==True and self.falltime/1000 >self.fallspeed:  
                        self.falltime = 0
                        self.gravityFig()
                        
                    
                if self.forceui==False:
                    self.gravityFig()
                    


                if self.forceui==True :
                    for event in pygame.event.get():
                        if event.type == pygame.QUIT:
                            self.start = False
                        if event.type == pygame.KEYDOWN:

                            if event.key == pygame.K_1:
                                self.fallspeed=0.1
                            if event.key == pygame.K_2:
                                self.fallspeed=0.01
                            if event.key == pygame.K_3:
                                self.fallspeed=0

                    pygame.display.update()
                    self.clock.tick(1000)








    def loopplayer(self):
            while self.start:
                
                self.falltime+=1
                

                
                if self.falltime/60 >self.fallspeed:
                    self.gravityFig()
                    self.falltime = 0
                    
                    

                for event in pygame.event.get():
                    if event.type == pygame.KEYDOWN:
                        if self.speedFig == False:
                            if event.key == pygame.K_LEFT or event.key == pygame.K_a:
                                self.FigLeft()
                            if event.key == pygame.K_RIGHT or event.key == pygame.K_d:
                                self.FigRight()
                            if event.key == pygame.K_UP or event.key == pygame.K_w:
                                self.RotateFig()

                        if event.key == pygame.K_k:
                            while 1:
                                pass
                        if event.key == pygame.K_DOWN or event.key == pygame.K_s:
                            if self.speedFig == False:
                                self.fallspeed = self.fallspeed/6
                                

                                self.cleanFigGrid(self.fallfig)
                                print("------------------------------")
                                print("Holes create: ",self.getHoleCreate())
                                print("Lines clear: ",self.getLineClear())
                                print("Bumpiness: ",self.getBumpiness())
                                print("GlobalHeight: ",self.globalheight)
                                print("------------------------------")

                                print(self.getParams())
                                self.convertFigGrid(self.fallfig)
                                self.render()


                                self.speedFig = True

                    if event.type == pygame.QUIT:
                        self.start = False

                if self.stop== True:
                    

                    
                    

                    self.start = False
                    global stat 
                    global nbstat
                    nbstat=nbstat+1
                    stat=stat+self.score

                    print("avrage score", stat/nbstat)


                pygame.display.update()
                self.clock.tick(60)








    def runAI(self):
        if(self.ai==False):
            return
        Mscore = 999999
        rotopt = 0
        popt = 0
        holeopt=0

        yinit= self.fallfig.y
        ynextinit = self.nextpiece.y

        contopt=0
        pxopt=[]
        pyopt=[]
        self.cleanFigGrid(self.fallfig)
        
        if self.npk == True:
            for rotnext in range(0,4):
            
                if rotnext==2 or rotnext==3:
                            if self.nextpiece.fig==Tetriminos.I or self.nextpiece.fig==Tetriminos.O or self.nextpiece.fig==Tetriminos.S or self.nextpiece.fig==Tetriminos.Z:
                                break
                self.nextpiece.rot=rotnext
                for pnext in range(0,self.case_x-len(self.nextpiece.getFig()[0])+1): 
                    self.nextpiece.x=pnext

                    for rot in range(0,4):
                        if rot==2 or rot==3:
                            if self.fallfig.fig==Tetriminos.I or self.fallfig.fig==Tetriminos.O or self.fallfig.fig==Tetriminos.S or self.fallfig.fig==Tetriminos.Z:
                                break

                        self.fallfig.rot=rot
                        for p in range(0,self.case_x-len(self.fallfig.getFig()[0])+1): 
                            self.fallfig.x = p
                            
                            params = self.getParams()
                            bump=params[2]*self.weightbump
                            hole=params[0]*self.weighthole  

                            line=params[1]*self.remap(params[3],0,(self.case_y-1),self.weightlinetop,self.weightlinebottom)        
                            gheight=params[4]*self.weightgheight


                            if(Mscore>hole+gheight+bump-line):
                                Mscore=hole+gheight+bump-line
                                
                                rotopt = rot
                                popt = p
                            #triedmoves+=1
                            
        if self.npk == False:
            for rot in range(0,4):
                        if rot==2 or rot==3:
                            if self.fallfig.fig==Tetriminos.I or self.fallfig.fig==Tetriminos.O or self.fallfig.fig==Tetriminos.S or self.fallfig.fig==Tetriminos.Z:
                                break

                        self.fallfig.rot=rot
                        for p in range(0,self.case_x-len(self.fallfig.getFig()[0])+1): 
                            self.fallfig.x = p

                            params = self.getParamsNotNPK()
                            bump=params[2]*self.weightbump
                            hole=params[0]*self.weighthole  

                            line=params[1]*self.remap(params[3],0,(self.case_y-1),self.weightlinetop,self.weightlinebottom)        
                            gheight=params[4]*self.weightgheight


                            if(Mscore>hole+gheight+bump-line):
                                
                                Mscore=hole+gheight+bump-line
                                rotopt = rot
                                popt = p
                            #triedmoves+=1

        
        
        
        
        self.nextpiece.y=ynextinit

        self.fallfig.rot=rotopt
        self.fallfig.x = popt
        self.fallfig.y = yinit
        self.convertFigGrid(self.fallfig)
        self.render()
        
    def remap(self,x, in_min, in_max, out_min, out_max):
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
        

    def getParams(self):
        yinit = self.fallfig.y
        ynextinit = self.nextpiece.y

        params=[]
        holes=0
        lines=0
        bump=0
        maxheight=0
        globalheight=0
        p = self.fallfig.x
        pnext= self.nextpiece.x

        fmh=False
        for row in self.grid:
            for pc in row:
                if pc!=0:
                    fmh=True
                    break
            if fmh==True:
                fmh=False
                break

            maxheight=maxheight+1
        
        bumpmap=[]


        #self.iscolideDown(self.nextpiece)
        while 1:
            if(self.iscolideDown(self.fallfig)):
                self.convertFigGrid(self.fallfig)
                while 1:
                    if(self.iscolideDown(self.nextpiece)):
                        self.cleanFigGrid(self.fallfig)
                        





                        hole=0
                        cont=0
                        px=[]
                        py=[]         
                        for Rcase in range(0,len(self.fallfig.getFig())):
                            for i in range(0,len(self.fallfig.getFig()[0])):
                                if self.fallfig.getFig()[Rcase][i] !=0:
                                    if(self.fallfig.y+Rcase+1==self.case_y):
                                        continue
                                    if(len(self.fallfig.getFig()) != Rcase+1):
                                        if(self.fallfig.getFig()[Rcase+1][i] != 0):
                                            continue
                                    if(self.grid[self.fallfig.y+Rcase+1][p+i]==0):
                                        
                                        
                                            try:
                                                if(self.grid[self.fallfig.y+Rcase+1][p+i]==0):
                                                    holes=holes+1
                                                else:
                                                    break
                                            except:
                                                break
                                            
                                    px.append (p+i)
                                    py.append(self.fallfig.y+Rcase)
                        
                        cont=0
                        px=[]
                        py=[]

                        self.convertFigGrid(self.fallfig)         
                        for Rcase in range(0,len(self.nextpiece.getFig())):
                            for i in range(0,len(self.nextpiece.getFig()[0])):
                                if self.nextpiece.getFig()[Rcase][i] !=0:
                                    if(self.nextpiece.y+Rcase+1==self.case_y):
                                        continue
                                    if(len(self.nextpiece.getFig()) != Rcase+1):
                                        if(self.nextpiece.getFig()[Rcase+1][i] != 0):
                                            continue
                                    if(self.grid[self.nextpiece.y+Rcase+1][pnext+i]==0):
                                        
                                        
                                            try:
                                                if(self.grid[self.nextpiece.y+Rcase+1][pnext+i]==0):
                                                    holes=holes+1
                                                else:
                                                    break
                                            except:
                                                break
                                            
                                    px.append (pnext+i)
                                    py.append(self.nextpiece.y+Rcase)
                        self.cleanFigGrid(self.fallfig)



                        indy=0
                        for row in self.fallfig.getFig():
                            fc=0
                            for cp in row:
                                if cp!=0:
                                    fc=fc+1
                            for x in range(0,self.case_x):
                                if self.grid[indy+self.fallfig.y][x] ==0:
                                    fc=fc-1
                            if fc==0:
                                lines=lines+1         
                            indy=indy+1

                        indy=0
                        for row in self.nextpiece.getFig():
                            fc=0
                            for cp in row:
                                if cp!=0:
                                    fc=fc+1
                            for x in range(0,self.case_x):
                                if self.grid[indy+self.nextpiece.y][x] ==0:
                                    fc=fc-1
                            if fc==0:
                                lines=lines+1         
                            indy=indy+1

                        self.convertFigGrid(self.fallfig)
                        self.convertFigGrid(self.nextpiece)
                        bumpmap=[0]*self.case_x
                        for x in range(0,self.case_x):
                            for column in range(0,self.case_y):
                                if self.grid[column][x]!=0:
                                    bumpmap[x]=self.case_y-column
                                    break
                        globalheight=sum(bumpmap)                      
                        self.cleanFigGrid(self.fallfig)
                        self.cleanFigGrid(self.nextpiece) 

                        break

                    self.nextpiece.y+=1
                break
            self.fallfig.y=self.fallfig.y+1


        self.fallfig.y=yinit
        self.nextpiece.y=ynextinit

        for b in range(0,len(bumpmap)-1):
           bump+= abs(bumpmap[b]-bumpmap[b+1])


        params=[holes,lines,bump,maxheight,globalheight]
        return params





    def getParamsNotNPK(self):
        yinit = self.fallfig.y
    
        params=[]
        holes=0
        lines=0
        bump=0
        maxheight=0
        globalheight=0
        p = self.fallfig.x    

        fmh=False
        for row in self.grid:
            for pc in row:
                if pc!=0:
                    fmh=True
                    break
            if fmh==True:
                fmh=False
                break

            maxheight=maxheight+1
        
        bumpmap=[]


        #self.iscolideDown(self.nextpiece)
        while 1:
            if(self.iscolideDown(self.fallfig)):
                        self.convertFigGrid(self.fallfig)
            
                        hole=0
                        cont=0
                        px=[]
                        py=[]         
                        for Rcase in range(0,len(self.fallfig.getFig())):
                            for i in range(0,len(self.fallfig.getFig()[0])):
                                if self.fallfig.getFig()[Rcase][i] !=0:
                                    if(self.fallfig.y+Rcase+1==self.case_y):
                                        continue
                                    if(len(self.fallfig.getFig()) != Rcase+1):
                                        if(self.fallfig.getFig()[Rcase+1][i] != 0):
                                            continue
                                    if(self.grid[self.fallfig.y+Rcase+1][p+i]==0):
                                        
                                        
                                            try:
                                                if(self.grid[self.fallfig.y+Rcase+1][p+i]==0):
                                                    holes=holes+1
                                                else:
                                                    break
                                            except:
                                                break
                                            

                                    px.append (p+i)
                                    py.append(self.fallfig.y+Rcase)
                        indy=0
                        for row in self.fallfig.getFig():
                            fc=0
                            for cp in row:
                                if cp!=0:
                                    fc=fc+1
                            for x in range(0,self.case_x):
                                if self.grid[indy+self.fallfig.y][x] ==0:
                                    fc=fc-1
                            if fc==0:
                                lines=lines+1         
                            indy=indy+1

    
                        self.convertFigGrid(self.fallfig)
                        
                        bumpmap=[0]*self.case_x
                        for x in range(0,self.case_x):
                            for column in range(0,self.case_y):
                                if self.grid[column][x]!=0:
                                    bumpmap[x]=self.case_y-column
                                    break
                        globalheight=sum(bumpmap)                      
                        self.cleanFigGrid(self.fallfig)

                        break

                    
                
            self.fallfig.y=self.fallfig.y+1


        self.fallfig.y=yinit
        

        for b in range(0,len(bumpmap)-1):
           bump+= abs(bumpmap[b]-bumpmap[b+1])


        params=[holes,lines,bump,maxheight,globalheight]
        return params





    def getHoleCreate(self):
        holes=0
        p = self.fallfig.x
        yinit = self.fallfig.y
        
        while True:
            if(self.iscolideDown(self.fallfig)):
                hole=0
                cont=0
                px=[]
                py=[]         
                for Rcase in range(0,len(self.fallfig.getFig())):
                    for i in range(0,len(self.fallfig.getFig()[0])):
                        if self.fallfig.getFig()[Rcase][i] !=0:
                            if(self.fallfig.y+Rcase+1==self.case_y):
                                continue
                            if(len(self.fallfig.getFig()) != Rcase+1):
                                if(self.fallfig.getFig()[Rcase+1][i] != 0):
                                    continue
                            if(self.grid[self.fallfig.y+Rcase+1][p+i]==0):
                                it=0
                                while True:
                                    try:
                                        if(self.grid[self.fallfig.y+Rcase+1+it][p+i]==0):
                                            holes=holes+1
                                        else:
                                            break
                                    except:
                                        break
                                    it=it+1
                            px.append(p+i)
                            py.append(self.fallfig.y+Rcase)
                break
            self.fallfig.y=self.fallfig.y+1
                
        self.fallfig.y=yinit
      
        return holes

    def getLineClear(self):
        lines=0
        yinit = self.fallfig.y

        
        while True: 
            if(self.iscolideDown(self.fallfig)):
                indy=0
                for row in self.fallfig.getFig():
                    fc=0
                    for cp in row:
                        if cp!=0:
                            fc=fc+1
                    for x in range(0,self.case_x):
                        if self.grid[indy+self.fallfig.y][x] ==0:
                            fc=fc-1
                    if fc==0:
                        lines=lines+1
                      
                    indy=indy+1
                break
            
            self.fallfig.y=self.fallfig.y+1


        self.fallfig.y=yinit
        
        return lines


    def getBumpiness(self):
        yinit = self.fallfig.y
        bump=0
        maxheight=0
        theight=0

        
        
        fmh=False
        for row in self.grid:
            for pc in row:
                if pc!=0:
                    fmh=True
                    break
            if fmh==True:
                fmh=False
                break

            maxheight=maxheight+1
        
        
        self.maxheight = maxheight
        bumpmap=[]
        while True: 
            if(self.iscolideDown(self.fallfig)):
                self.convertFigGrid(self.fallfig)

                bumpmap=[0]*self.case_x
                for x in range(0,self.case_x):
                    for column in range(0,self.case_y):
                        if self.grid[column][x]!=0:
                            bumpmap[x]=self.case_y-column
                            break
                self.globalheight=sum(bumpmap)                      
                

                self.cleanFigGrid(self.fallfig) 
                break
            self.fallfig.y=self.fallfig.y+1

        #print("figure height :",theight)
        
        for b in range(0,len(bumpmap)-1):
           bump+= abs(bumpmap[b]-bumpmap[b+1])


        self.fallfig.y=yinit
        
        return bump


    def render(self):
        if self.ai==False or self.forceui==True:
            indx=0
            indy=0
            for grid in self.grid:
                for gridcase in grid:
                    
                    if gridcase==0:
                        pygame.draw.rect(self.screen,(0,0,0),[indx*self.case_size,indy*self.case_size,self.case_size,self.case_size])
                    elif gridcase==1:
                        pygame.draw.rect(self.screen,(51,255,255),[indx*self.case_size,indy*self.case_size,self.case_size,self.case_size])
                    elif gridcase==2:
                        pygame.draw.rect(self.screen,(255,102,255),[indx*self.case_size,indy*self.case_size,self.case_size,self.case_size])
                    elif gridcase==3:
                        pygame.draw.rect(self.screen,(255,255,0),[indx*self.case_size,indy*self.case_size,self.case_size,self.case_size])
                    elif gridcase==4:
                        pygame.draw.rect(self.screen,(204,0,0),[indx*self.case_size,indy*self.case_size,self.case_size,self.case_size])
                    elif gridcase==5:
                        pygame.draw.rect(self.screen,(153,255,76),[indx*self.case_size,indy*self.case_size,self.case_size,self.case_size])
                    elif gridcase==6:
                        pygame.draw.rect(self.screen,(0,204,0),[indx*self.case_size,indy*self.case_size,self.case_size,self.case_size])
                    elif gridcase==7:
                        pygame.draw.rect(self.screen,(0,0,153),[indx*self.case_size,indy*self.case_size,self.case_size,self.case_size])
                        
                    indx=indx+1
                indy=indy+1
                indx=0
    
    

    def RotateFig(self):
        self.cleanFigGrid(self.fallfig)
        self.fallfig.rotate()
        if self.iscollideRotate() == True:
            self.fallfig.reverseRotate()
            self.convertFigGrid(self.fallfig)
            self.render()
            pass
        else:
            self.convertFigGrid(self.fallfig)
            self.render()


    def FigRight(self):
        if self.iscolideRight() == True:
            pass
        else:
            self.cleanFigGrid(self.fallfig)
            self.fallfig.x=self.fallfig.x+1
            self.convertFigGrid(self.fallfig)
            self.render()
        
    def FigLeft(self):
        if self.iscolideLeft() == True:
            pass
        else:
            self.cleanFigGrid(self.fallfig)
            self.fallfig.x=self.fallfig.x-1
            self.convertFigGrid(self.fallfig)
            self.render()
        
    def iscolideRight(self):
        for Rcase in range(0,len(self.fallfig.getFig())):
            for i in range(0,len(self.fallfig.getFig()[0])):
                
                if self.fallfig.getFig()[Rcase][len(self.fallfig.getFig()[0])-1-i] !=0:
                    if self.fallfig.x+len(self.fallfig.getFig()[0])-i==self.case_x:
                        return True
                    
                    if self.grid[self.fallfig.y+Rcase][self.fallfig.x+len(self.fallfig.getFig()[0])-i]!=0:
                        return True
                    break
                    
        return False


    def iscolideLeft(self):
        for Rcase in range(0,len(self.fallfig.getFig())):
            for i in range(0,len(self.fallfig.getFig()[0])):
                
                if self.fallfig.getFig()[Rcase][i] !=0:
                    if self.fallfig.x+i==0:
                        return True
                    
                    if self.grid[self.fallfig.y+Rcase][self.fallfig.x+i-1]!=0:
                        return True
                    break
                    
        return False


    def iscolideDown(self,fig):

        indx=0
        for Dcase in fig.getFig()[len(fig.getFig())-1]:

            if Dcase!=0:
                if fig.y+len(fig.getFig())==self.case_y:
                    return True
                if self.grid[fig.y+len(fig.getFig())][fig.x+indx]!=0:
                    return True
            else:

                for i in range(1,len(fig.getFig())):
                   
                    if fig.getFig()[len(fig.getFig())-1-i][indx]!=0:
                        if self.grid[fig.y+len(fig.getFig())-i][fig.x+indx]!=0:
                            return True
                        break
                        

            indx=indx+1
        
    


        return False

    def gravityFig(self):
        
        if self.iscolideDown(self.fallfig)==True:
            self.newlinecheck()
            self.intFig()
            self.mvs+=1
            #print(self.mvs)
            if(self.mvs>=self.maxmoves and self.maxmoves!=-1):
                self.stop=True
            if self.speedFig == True:
                self.fallspeed = self.fallspeed*6
                self.speedFig = False

            
            if self.loosecheck() == True:
               self.stop=True
            else:
                self.convertFigGrid(self.fallfig)
                self.render()
            self.runAI()
        else:
            self.cleanFigGrid(self.fallfig)
            self.fallfig.y=self.fallfig.y+1
            self.convertFigGrid(self.fallfig)
            self.render()
    


    def newlinecheck(self):
        indy=0
        for row in self.fallfig.getFig():
            fc=0
            for x in range(0,self.case_x):
                if self.grid[indy+self.fallfig.y][x] ==0:
                    fc=1
            if fc==0:
                line=indy+self.fallfig.y
                self.clearline(line)
                self.score=self.score+1
                #print(self.score)
                
                
            indy=indy+1
        

    def clearline(self,y):
        self.rowclear=self.rowclear+1
        grid = np.array(self.grid)
        grid = np.delete(grid, y, 0)
        grid = np.vstack([[0]*self.case_x, grid])
        self.grid = grid.tolist()
        
    def loosecheck(self):
        if self.fallfig == None:
            return False
        indx=0
        indy=0
        try:
            for row in self.fallfig.getFig():
                for colum in row:
                    if self.fallfig.getFig()[indy][indx]!=0:
                            if self.grid[indy+self.fallfig.y][indx+self.fallfig.x]!=0:
                                return True
                    indx=indx+1
                indx=0
                indy=indy+1
        except:
            return True
        return False



    def cleanFigGrid(self,fig):
        if fig == None:
            return
        indx=0
        indy=0
        for row in fig.getFig():
            for colum in row:
                if fig.getFig()[indy][indx]!=0:
                    self.grid[indy+fig.y][indx+fig.x]=0
                indx=indx+1
            indx=0
            indy=indy+1
    
    def iscollideRotate(self):
        if self.fallfig == None:
            return False
        indx=0
        indy=0
        try:
            for row in self.fallfig.getFig():
                for colum in row:
                    if self.fallfig.getFig()[indy][indx]!=0:
                            if self.grid[indy+self.fallfig.y][indx+self.fallfig.x]!=0:
                                return True
                    indx=indx+1
                indx=0
                indy=indy+1
        except:
            return True
        return False

    def convertFigGrid(self,fig):
        if fig == None:
            return
        indx=0
        indy=0
        for row in fig.getFig():
            for colum in row:
                if fig.getFig()[indy][indx]!=0:
                        self.grid[indy+fig.y][indx+fig.x]=fig.getFig()[indy][indx]
                indx=indx+1
            indx=0
            indy=indy+1


    def intFig(self):
        self.fallfig = self.nextpiece
        self.nextpiece = Tetriminos.Tetrimino(4,0)
        
        
