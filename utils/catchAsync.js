
// module.exports = func => (req, res, next) => {
//     func(req, res, next).catch(next);
// }
//--------------------------------------
// module.exports =  fn => (req, res, next) => {
//     return Promise
//         .resolve(fn(req, res, next))
//         .then()
//         .catch((e)=>{
//             next(e)
//         });
// };
//----------------------------------
// module.exports =  fn => (req, res, next) => {
//     return Promise
//         .resolve(fn(req, res, next))
//         .then(()=>{},(e)=>next(e))
//         // .catch((e)=>{
//         //     next(e)
//         // });
// };
//----------------------------------
// module.exports = function func(promise){
//     return function (req, res, next){
//         Promise.resolve(promise(req, res, next)).catch(()=>{
//             throw new Error("Cannnot cast Id of object")
//         }).catch((e)=>{
//             next(e)
//             console.log(e.message)
//         });
//     }
// }
//--------------------------------
// module.exports = function func(promise){
//     return function (req, res, next){
//         Promise.resolve(promise(req, res, next)).catch(()=>{
//             return Promise.reject(new Error("error"))
//         }).catch((e)=>{
//             next(e)
//             console.log(e)
//         });
//     }
// }
//-----------------------------
module.exports = function (promise){
    return function (req, res, next){
       return promise(req, res, next).then().catch(next);
    }
}
// -------------------------------------
// module.exports = func => (req, res, next) => {
//     func(req, res, next).then(()=>{
//     },(e)=>{
//         next(e)
//     });
// }
// ************************************
// app.get('/', (req, res, next) => {
//     Promise.resolve().then(() => {
//       throw new Error('BROKEN')
//     }).catch(next) // Errors will be passed to Express.
//   })