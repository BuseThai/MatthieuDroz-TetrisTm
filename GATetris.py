import Tetris
import random
import threading
import time
from itertools import combinations

class GATetris:

    def __init__(self,npopulation=100,nfitness=10,nparams=5,ngeneration=20):
        self.npopulation = npopulation
        self.nfitness= nfitness
        self.nparams = 5
        self.ngeneration = ngeneration

        self.population = []
        self.nextpopulation = []


    def run(self):
        self.population = self.generatePopulation(individual=self.npopulation,params=self.nparams)
        for g in range(0,self.ngeneration):
            self.FitnessPopulation(iter=self.nfitness)
            self.sortpopulation()
            print("Generation :",g)
            print(len(self.population))
            print(self.population)
            self.selectionPopulation()
        
    def generatePopulation(self,individual=100,params=5):
        pop = []
        for p in range(0,individual):
            info = []
            for inf in range(0,params):
                info.append(round(random.random(),5))
            info.append(0)
            pop.append(info)
        return pop

    def FitnessPopulation(self,iter=10):  
        for id in range(0,len(self.population)):
            threads = list()
            wltop = self.population[id][0]
            wlbot = self.population[id][1]
            wb = self.population[id][2]
            wh = self.population[id][3]
            wgh=self.population[id][4]
            for i in range(0,iter):
                x = threading.Thread(target=self.FitnessIndividual, args=(wltop,wlbot,wb,wh,wgh,id))
                threads.append(x)
                x.start()
            for thread in threads:
                thread.join() 
            print("individual :",id)

    def FitnessIndividual(self,wltop,wlbot,wb,wh,wgh,id):
        fitscore =Tetris.TetrisGame(ai=True,wltop= wltop,wlbot=wlbot,wb= wb,wh= wh,wgh=wgh).run()
        self.population[id][5]+=fitscore
        
    def sortpopulation(self):
        self.population.sort(key=self.sortsec, reverse=True)
   
    def sortsec(self,elem):
        return elem[5]

    def selectionPopulation(self):
        self.nextpopulation=[]
        self.crossover=[]

        mostev = self.population[0]
        self.population.pop(0)

        tot=0
        for w in range(0,len(self.population)):
            tot +=self.population[w][5]
        

        indweight=[]
        for w in range(0,len(self.population)):
            indweight.append(self.population[w][5]/tot)

        self.crossover = random.choices(self.population, weights=indweight, k=2)
        self.crossover.insert(0,mostev)

        for s in range(0,len(self.crossover)):
            self.crossover[s][5]=0

        res = list(combinations(self.crossover, 2))
        
        mostev[5]=0
        self.nextpopulation.append(mostev)


        for cross in res:
            offspring=[]
            for para in range(0,5):
                
                offspring.append(round((cross[0][para]+cross[1][para])/2,5))

            offspring.append(0)
            self.nextpopulation.append(offspring)
        complet = self.generatePopulation(individual=(self.npopulation-len(self.nextpopulation)))
        
        print("nextpop size :",len(self.nextpopulation))
        print("complet size :",len(complet))

        self.population=self.nextpopulation+complet
    
   
GATetris(npopulation=10,nfitness=10,nparams=5,ngeneration=5).run()



#print(Tetris.TetrisGame().run())
#print(Tetris.TetrisGame(ai=True,ForceUI=False,wltop=0.7032,wlbot=0.56141,wb=0.27375,wh=0.39578,wgh=0.82356).run())
#GArun()
#i=0
#print(Tetris.TetrisGame(True,True,0.67715, 0.29658, 0.20789, 0.23547, 0.60586).run())
#for x in range(0,10):
#    i+=Tetris.TetrisGame(ai=True,ForceUI=True).run()
#print(i)

#i=0
#for x in range(0,10):
#    i+=Tetris.TetrisGame(True,True,0.46297, 0.95671, 0.21973, 0.20722, 0.93779).run()
#print(i)


#perfect ??
#print(Tetris.TetrisGame(ai=True,ForceUI=True,wltop=0.760666,wlbot=0.760666,wb=0.184483,wh=0.35663,wgh=0.510066).run())

#bad(328) 0.54254, 0.24565, 0.87891, 0.25455, 0.09091
#good(15156) 0.7398, 0.17577, 0.1646, 0.27824, 0.705
