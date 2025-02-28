let vedio_info = null;
fetch('/static/data/home/vedio.json')
.then(response => response.json())
.then(data => {
    vedio_info = data;
    console.log(vedio_info.class210);
})

document.addEventListener('DOMContentLoaded', function() {
    //初始化基本功能
    document.getElementById('home').addEventListener('click', function(){
        while (document.getElementById('container').firstChild) {
            document.getElementById('container').removeChild(document.getElementById('container').firstChild);
        }
        let e=`<h1 id="sentence" class="fade-in-left">阿你知道LP跟BP是甚麼嗎?<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;前幾天上課有人說...懶趴</h1>`
        document.getElementById('container').innerHTML = e;
    });

    // 載入課程列表
    fetch('/static/data/home/class.json')
    .then(response => response.json())
    .then(data => {
        let classList = data;
        let classAreaHTML = '';
        for(let i = 0; i < classList.class.length; i++) {
            classAreaHTML += `<div class="class" id='${classList.class[i]}'>
                ${classList.class[i]}
            </div>`;
        }
        document.getElementById('class-area').innerHTML = classAreaHTML;
        for(let i = 0; i < classList.class.length; i++) {
            let classId = classList.class[i];
            let class_item = document.getElementById(classId);
            
            if(class_item) {
                class_item.addEventListener('click', function(){
                    let vedioAreaHTML = '';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    if(vedio_info && vedio_info[`class${classId}`]) {
                        const videos = vedio_info[`class${classId}`];
                        
                        for(let j = 0; j < videos.length; j++) {
                            const video = videos[j];
                            vedioAreaHTML += `<div class="vedio" onclick="play('${video.url}')">
                                <img src="static/images/${video.img}" alt="${video.book}" class="vedio-img">
                                <p class="title">${video.title}</p>
                                <p class="date">${video.date}</p>
                            </div>`;
                            if(j < videos.length - 1) {
                                vedioAreaHTML += `<div class="dashed"></div>`;
                            }
                        }
                        if(! document.getElementById('vedio-area')) {
                            document.getElementById('container').innerHTML += `<div class="vedio-area" id="vedio-area"></div>`;
                            document.getElementById('sentence').remove();
                        }
                        document.getElementById('vedio-area').innerHTML = vedioAreaHTML;
                    }
                });
            }
        }
    })
    .catch(error => console.error('Error:', error)); 
});