/* ============================== Phase 1 ============================== */
/* -------------------------- exploring async -------------------------- */

const num1 = () => {
    return 1;
}

const num2 = async () => {
    return 2;

}
num2().then(result => console.log(result))
console.log('num 1', num1())
console.log('num 2', num2())

/* ============================== Phase 2 ============================== */
/* -------------------------- exploring await -------------------------- */

const waiting = async () => {
    const value = await num2();
    console.log('waiting', value)
}

waiting();

/* ============================== Phase 3 ============================== */
/* --------------------- creating a custom Promise --------------------- */

const waitForMyPromise = async () => {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve('done!!!');
        }, 1000)
    });
    const result = await promise;
    console.log('my promise is', result);
}

waitForMyPromise();


/* ============================== Phase 4 ============================== */
/* -------------------------- exploring then --------------------------- */

new Promise((resolve) => {
    setTimeout(() => {
        resolve('done!')
    }, 1500)
})
    .then(r => console.log('then my other promise is', r)); //.then automatically invokes the
                                                            // function so no () needed at the of the function



/* ============================== Phase 5 ============================== */
/* ------------------- turn setTimeout into a Promise ------------------ */

const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const anotherPromise = async () => {
    const holdOn = await wait(5000)
    console.log('another promise is done')
}

anotherPromise()

/* ============================== Phase 6 ============================== */
/* -------------------- exploring reject and .catch -------------------- */

const tryRandomPromise = (random) => {
    return new Promise((resolve, reject) => {
        if(random > 0.5) {
            resolve('success!!!');
        } else {
            reject('random error')
        }
    } )
}

for(let i = 1; i < 10; i++) {
    const random = Math.random()
    wait(2000 + random * 1000)
    .then(() => tryRandomPromise(random))
    .then( result => console.log('random try #', i, result))
    .catch(error => console.error('random try #', i, error))
}

/* ============================== Phase 7 ============================== */
/* ---------------- exploring async/await and try/catch ---------------- */

const tryAgain = async (i) => {
    const random = Math.random()
    await wait(3000 + random * 1000)
    try{
        const result = await tryRandomPromise(random);
        console.log('random again #', i, result);
    } catch (error) {
        console.error('random again #', i, error)
    }
};

for(let i = 1; i < 10; i++){
    tryAgain(i)
}

/* ============================== Phase 8 ============================== */
/* -------------------- Promises are asynchronous! --------------------- */

console.log('END OF PROGRAM')
