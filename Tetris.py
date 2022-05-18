import pygame
import Tetriminos


class TetrisGame:
    def __init__(self):
        self.start = True
        self.stop = False
        self.grid = [
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0]
        ]
        self.case_x = 10
        self.case_y = 20
        self.case_size = 40
        pygame.init()
        self.clock = pygame.time.Clock()
        self.falltime = 0
        self.fallspeed = 0.20
        self.speedFig = False
        self.fallfig = None

        self.screen =pygame.display.set_mode((self.case_x*self.case_size,self.case_y*self.case_size))
        self.intFig()
        self.convertFigGrid()
        self.render()

        while self.start:
            
            self.falltime+=1
            

            
            if self.falltime/25 >self.fallspeed:
                self.gravityFig()
                self.falltime = 0
                
                

            for event in pygame.event.get():
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_LEFT or event.key == pygame.K_a:
                        self.FigLeft()
                    if event.key == pygame.K_RIGHT or event.key == pygame.K_d:
                        self.FigRight()
                    
                    if event.key == pygame.K_DOWN or event.key == pygame.K_s:
                        if self.speedFig == False:
                            self.fallspeed = self.fallspeed/6
                            self.speedFig = True

                if event.type == pygame.KEYUP:
                    if event.key == pygame.K_DOWN or event.key == pygame.K_s:
                        if self.speedFig == True:
                            self.fallspeed = self.fallspeed*6
                            self.speedFig = False

                if self.stop== True:
                    print("you loose")
                    self.start = False

                if event.type == pygame.QUIT:
                    self.start = False
            pygame.display.update()
            self.clock.tick(25)


    def render(self):
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
    
    def FigRight(self):
        if self.iscolideRight() == True:
            pass
        else:
            self.cleanFigGrid()
            self.fallfig.x=self.fallfig.x+1
            self.convertFigGrid()
            self.render()
        
    def FigLeft(self):
        if self.iscolideLeft() == True:
            pass
        else:
            self.cleanFigGrid()
            self.fallfig.x=self.fallfig.x-1
            self.convertFigGrid()
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


    def iscolideDown(self):

        indx=0
        for Dcase in self.fallfig.getFig()[len(self.fallfig.getFig())-1]:

            if Dcase!=0:
                if self.fallfig.y+len(self.fallfig.getFig())==self.case_y:
                    return True
                if self.grid[self.fallfig.y+len(self.fallfig.getFig())][self.fallfig.x+indx]!=0:
                    return True
            else:

                for i in range(1,len(self.fallfig.getFig())):
                   
                    if self.fallfig.getFig()[len(self.fallfig.getFig())-1-i][indx]!=0:
                        if self.grid[self.fallfig.y+len(self.fallfig.getFig())-i][self.fallfig.x+indx]!=0:
                            return True
                        break
                        

            indx=indx+1
        
    


        return False

    def gravityFig(self):
        
        if self.iscolideDown()==True:
            self.intFig()
            self.convertFigGrid()
            self.render()
            pass
        else:
            self.cleanFigGrid()
            self.fallfig.y=self.fallfig.y+1
            self.convertFigGrid()
            self.render()

    def cleanFigGrid(self):
        if self.fallfig == None:
            return
        indx=0
        indy=0
        for row in self.fallfig.getFig():
            for colum in row:
                if self.fallfig.getFig()[indy][indx]!=0:
                    self.grid[indy+self.fallfig.y][indx+self.fallfig.x]=0
                indx=indx+1
            indx=0
            indy=indy+1


    def convertFigGrid(self):
        if self.fallfig == None:
            return
        indx=0
        indy=0
        for row in self.fallfig.getFig():
            for colum in row:
                if self.fallfig.getFig()[indy][indx]!=0:
                    self.grid[indy+self.fallfig.y][indx+self.fallfig.x]=self.fallfig.getFig()[indy][indx]
                indx=indx+1
            indx=0
            indy=indy+1


    def intFig(self):
        self.fallfig = Tetriminos.Tetrimino(4,0)
        

TetrisGame()
pygame.quit()