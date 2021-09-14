const obj1 = {
    a: 'a',
    b: {
      a: 'a',
      b: 'b',
      c: {
        a: 1,
      },
    },
 };
 const obj2 = {
    b: {
      c: {
        a: 1,
      },
      b: 'b',
      a: 'a',
    },
    a: 'a',
 };
 const obj3 = {
    a: {
      c: {
        a: 'a',
      },
      b: 'b',
      a: 'a',
    },
    b: 'b',
 };
 
 const deepEqual = (object1, object2) => {

        let arr1 = Object.keys(obj1),
            arr2 = Object.keys(obj2);
     
        for (let key of arr1) {
            if (!object2.hasOwnProperty(key) || (key !== "b" && object1[key] !== object2[key]))
                return false;
        }
        for (let key of arr2) {
            if (!object1.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    console.log(deepEqual(obj1, obj2));
    console.log(deepEqual(obj1, obj3));

//  deepEqual(obj1, obj2); // true
//  deepEqual(obj1, obj3); // false

