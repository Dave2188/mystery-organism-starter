// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const findPercent = (partNum,totalNum) => {
   return Math.round((partNum / totalNum) * 100);
}

const arrOfSpecimens = [];

//function takes in sample number and gives it a random dna strand from mockupstrand
const pAequorFactory = (sNum,mockUpStrand) => { 
  return {specimenNum: sNum, 
                  dna: mockUpStrand(), 
                  mutate() {
                    const ranNum = Math.floor(Math.random() * 16)
                    let selRanBase = this.dna[ranNum];
                    let newMutated = returnRandBase();
                    selRanBase !== newMutated ? this.dna[ranNum] = newMutated : this.mutate();
                  },
                  compareDna(otherSpecimen) {
                    const spec1 = this.dna;
                    const spec2 = otherSpecimen.dna;
                    let numOfCommon = 0;
                    let index = 0;
                    

                    for (dna in spec1) {
                       if (spec1[index] === spec2[index]) {
                         numOfCommon++;
                       };
                       index++
                    };
                    
                    let percentInCommon = findPercent(numOfCommon,15);

                    return `Specimen #${this.specimenNum} and Specimen #${otherSpecimen.specimenNum} have 
                    ${percentInCommon}% DNA in common.`;
                  },
                  willLikelySurvive() {
                    let numOfC = 0;
                    let numOfG = 0;
                    for (base of this.dna) {
                      if(base === 'C') {
                        numOfC++
                      }else if (base === 'G') {
                        numOfG++
                      };
                    };
                  
                    let percentC = findPercent(numOfC, 15);
                    let percentG = findPercent(numOfG, 15);

                    return percentC >= 60 || percentG >= 60 ? true : false;
                    
                  }
                };        
                                                    
};

const make30Survive = () => {
  let specNum = 1
      while (arrOfSpecimens.length < 31){
        const spec = pAequorFactory(specNum,mockUpStrand)
        const willSurvive = spec.willLikelySurvive();

        if (willSurvive === true) {
          arrOfSpecimens.push(spec);
          specNum++
        };
      };
};


make30Survive()
//console.log(arrOfSpecimens.length);
//test for factory function and mutate method
//console.log(pAequorFactory(1,mockUpStrand));
//arrOfSpecimens.push(pAequorFactory(1,mockUpStrand));
//arrOfSpecimens.push(pAequorFactory(2,mockUpStrand));
//console.log(arrOfSpecimens[0].willLikelySurvive());
//console.log(arrOfSpecimens[0].compareDna(arrOfSpecimens[1]));
// arrOfSpecimens[0].mutate();
 console.log(arrOfSpecimens);







