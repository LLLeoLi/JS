/* LLLeo's comment: 为xox做的网站写的js脚本，SB wordpress，SB elementor */
function counter(){
    let items = Array.from(document.querySelectorAll(".eael-filterable-gallery-item-wrap"));
    let count = items.reduce((prev,item)=>{
        if(item.style.display === "none") prev++;
        return prev;
    },0)
    console.log("LENGTH:",items.length);
    console.log("COUNT:",count);
}
const selectItemsPC = ["MV/PV与总选","留言互动","综艺金曲"]
const selectItemsMobile = ["综艺金曲"]
const selectItems = innerWidth > 1024 ?  selectItemsPC : selectItemsMobile;
let index = innerWidth > 1024 ? 0 : 1;
document.querySelectorAll(".control").forEach((elem)=>{
    elem.addEventListener("click",e => {
        let target = e.target.innerText;
        console.log(target);
        let elementLoadMore = document.querySelectorAll(".eael-filterable-gallery-loadmore")[index];
        if(selectItems.includes(target)){
            elementLoadMore.style.display = "none";
        }
        else{
            elementLoadMore.style.display = "inherit";
        }
        counter()
    });
})