import Tetris
import random
import threading
import time
from itertools import combinations
from multiprocessing import Process,Value,Array,active_children

import json

class GATetris:

    def __init__(self,npopulation=100,nfitness=10,nparams=5,ngeneration=20,npk=True,maxmoves=1000,mostevkeep=10,mostevchildrenkeep=10,childrenkeep=30,populationkeep=10):
        self.npopulation = npopulation
        self.nfitness= nfitness
        self.nparams = 5
        self.ngeneration = ngeneration
        self.npk=npk
        self.mm = maxmoves

        self.mostevkeep = int((npopulation*mostevkeep)/100)
        self.mostevchildrenkeep = int((npopulation*mostevchildrenkeep)/100)
        self.childrenkeep = int((npopulation*childrenkeep)/100)
        self.populationkeep = int((npopulation*populationkeep)/100)


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
            data = {
                "iteration": g,
                "npopulation": len(self.population),
                "nfitness": self.nfitness,
                "nparams": self.nparams,
                "ngeneration": self.ngeneration,
                "npk": self.npk,
                "maxmoves" : self.mm,
                "pop": self.population
            }
            with open("training.json", "w") as outfile:
                json.dump(data, outfile)

            self.selectionPopulation()
    def resume(self,file="training.json"):

     with open(file, 'r') as fcc_file:
        fcc_data = json.load(fcc_file)

        self.npopulation = fcc_data['npopulation']
        self.nfitness= fcc_data["nfitness"]
        self.nparams = fcc_data["nparams"]
        self.ngeneration = fcc_data["ngeneration"]
        self.npk= fcc_data["npk"]
        self.mm = fcc_data["maxmoves"]
        self.population= fcc_data["pop"]
        iter = fcc_data["iteration"]

        
        print("Generation :",iter)
        print(len(self.population))
        print(self.population)
        iter+=1

        for g in range(iter,self.ngeneration):
            self.FitnessPopulation(iter=self.nfitness)
            self.sortpopulation()
            print("Generation :",g)
            print(len(self.population))
            print(self.population)
            data = {
                "iteration": g,
                "npopulation": len(self.population),
                "nfitness": self.nfitness,
                "nparams": self.nparams,
                "ngeneration": self.ngeneration,
                "npk": self.npk,
                "maxmoves" : self.mm,
                "pop": self.population
            }
            with open("training.json", "w") as outfile:
                json.dump(data, outfile)

            self.selectionPopulation()
        pass

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

            sc = Value('i', 0)

            for i in range(0,iter):
                x = Process(target=self.FitnessIndividual, args=(wltop,wlbot,wb,wh,wgh,id,sc,i))
                threads.append(x)
                x.start()

            #print("-------Wait processing-------")
            for thread in threads:
                thread.join(timeout=30)
        

    

            self.population[id][5]=sc.value
            print("------------------------------------------------------------------------------------")
            print("individual :",id)
            print("Score :",self.population[id][5])
            print("wltop :",wltop,"-wlbot:",wlbot,"-wb:",wb,"-wh:",wh,"-wgh:",wgh)
            print("------------------------------------------------------------------------------------")
            

    def FitnessIndividual(self,wltop,wlbot,wb,wh,wgh,id,sc,iter):
        fitscore =Tetris.TetrisGame(ai=True,ForceUI=False,NPK=self.npk,wltop= wltop,wlbot=wlbot,wb= wb,wh= wh,wgh=wgh,maxmoves=self.mm).run()
        sc.value+=fitscore
        #print("score of",iter,"is",fitscore)
        
    def sortpopulation(self):
        self.population.sort(key=self.sortsec, reverse=True)
   
    def sortsec(self,elem):
        return elem[5]

    def selectionPopulation(self):
        self.nextpopulation=[]
        self.crossover=[]

        

        #-----------------------------------------------------------------------
        for x in range(self.mostevkeep):
            self.nextpopulation.append(self.population[x])

        print("most",self.mostevkeep,"evolved keeps")
        #-----------------------------------------------------------------------

        mostev = self.population[0]
        self.population.pop(0)

        tot=0
        for w in range(0,len(self.population)):
            tot +=self.population[w][5]

        indweight=[]
        for w in range(0,len(self.population)):
            indweight.append(self.population[w][5]/tot)

        #-----------------------------------------------------------------------
        reproducermostev = random.choices(self.population, weights=indweight, k=self.mostevchildrenkeep)
        for y in range(self.mostevchildrenkeep):
            offspring=[]
            for para in range(0,5):
                offspring.append(round((mostev[para]+reproducermostev[y][para])/2,5))
            offspring.append(0)
            self.nextpopulation.append(offspring)

        print("mostevchildren",self.mostevchildrenkeep,"evolved keeps")
        #-----------------------------------------------------------------------




        #-----------------------------------------------------------------------
        self.crossover = random.choices(self.population, weights=indweight, k=self.childrenkeep)
        self.crossover.insert(0,mostev)

        for s in range(0,len(self.crossover)):
            self.crossover[s][5]=0

        res = list(combinations(self.crossover, 2))
        
        res = res[0:self.childrenkeep]
        for cross in res:
            offspring=[]
            for para in range(0,5):
                
                offspring.append(round((cross[0][para]+cross[1][para])/2,5))

            offspring.append(0)
            self.nextpopulation.append(offspring)
        print("children",self.childrenkeep,"keeps")
        #-----------------------------------------------------------------------


        #-----------------------------------------------------------------------
        for x in range(self.mostevkeep-1):
            self.population.pop(x)
            indweight.pop(x)

        popkeep = random.choices(self.population, weights=indweight, k=self.populationkeep)

        self.nextpopulation= self.nextpopulation+popkeep
        print("population",self.populationkeep,"keeps")
        #-----------------------------------------------------------------------

        for z in range(len(self.nextpopulation)):
            self.nextpopulation[z][5]=0

        complet = self.generatePopulation(individual=(self.npopulation-len(self.nextpopulation)))
        
        print("nextpop size :",len(self.nextpopulation))
        print("complet size :",len(complet))

        self.population=self.nextpopulation+complet
    








from multiprocessing import Process, freeze_support
if __name__ == '__main__':
    freeze_support()
    #GATetris(npopulation=100,nfitness=100,nparams=5,ngeneration=100,npk=False,maxmoves=-1).run()
    GATetris().resume("training.json")



#print(Tetris.TetrisGame().run())

#print(Tetris.TetrisGame(ai=True,ForceUI=False,wltop=0.7032,wlbot=0.56141,wb=0.27375,wh=0.39578,wgh=0.82356,maxmoves=500).run())


#print(Tetris.TetrisGame(ai=True,ForceUI=True,wltop=1,wlbot=1,wb=1,wh=1,wgh=1,maxmoves=1000).run())

#print(Tetris.TetrisGame(ai=True,ForceUI=False,wltop=0.7398,wlbot=0.17577,wb=0.1646,wh=0.27824,wgh=0.705,maxmoves=1000).run())



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