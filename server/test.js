function test(a){
    b(function(){
        console.log(a);
    });
}

function b(callback){
    setTimeout(callback, 3000);
}

test(1);
test(2);
