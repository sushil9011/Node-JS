console.log("Hello World");
console.log(__filename);
console.log(__dirname);

let time = 59;

setTimeout(() => {
    console.log(`Hello World`);
}, 10000);

setInterval(() => {
    if(time == 0) {
        return;
    }
    console.log(`Sagar Chavda ${time}`);
    time--;
}, 1000);