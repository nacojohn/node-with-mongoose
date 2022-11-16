async function timer() {
    let result;
    setTimeout(() => {
        result = 100
    }, 500);
    console.log(result);
}

await timer();