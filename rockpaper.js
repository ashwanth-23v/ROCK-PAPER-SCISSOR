 let score=JSON.parse(localStorage.getItem('score'))||{
        wins:0,
        loses:0,
        tie:0
    }  

    Updatescore();

    function reset(){
        localStorage.removeItem('score');
        score={
            wins:0,
            loses:0,
            tie:0
        }
        Updatescore();
    }  

    let AutoPlay=false;
    let eventId;

    document.querySelector('.auto-play').addEventListener('click',()=>{
        autoPlay();
    });
    document.body.addEventListener('keydown',(event)=>{
        if(event.key==='a'){
            autoPlay();
        }
    });
    function autoPlay(){
        const auto=document.querySelector('.auto-play-off');
        if(!AutoPlay){
            eventId=setInterval(()=>{
            const playermove=getCompMove();
            game(playermove);
            },1000)
         AutoPlay=true;
         auto.innerText='Stop';
         auto.classList.add('auto-play-on');
        }
        else{
           clearInterval(eventId);
           AutoPlay=false;
           auto.classList.remove('auto-play-on');
           auto.innerText='Autoplay';
        }
    }   

    function Updatescore(){
        document.querySelector('.js-score')
            .innerHTML=`wins:${score.wins} loses:${score.loses} tie:${score.tie}`;
    }

    document.querySelector('.rock-button').addEventListener('click',()=>{
        game('rock');
    })
        document.querySelector('.paper-button').addEventListener('click',()=>{
        game('paper');
    })
        document.querySelector('.scissors-button').addEventListener('click',()=>{
        game('scissors');
    })

    document.body.addEventListener('keydown',(event)=>{
        if(event.key==='r'){
            game('rock');
        }
        else if(event.key==='p'){
            game('paper');
        }
        else if(event.key==='s'){
            game('scissors');
        }
    })

    function game(playermove){
    const computerMove=getCompMove();
    let result='';
    if(playermove==='rock'){
        if(computerMove==='rock'){
            result='TIE';
            score.tie+=1;
        }
        else if(computerMove==='paper'){
            result='YOU LOSE';
            score.loses+=1;
        }
        else if(computerMove==='scissors'){
            result='YOU WIN';
            score.wins+=1;
        }
    }

    else if(playermove==='paper'){
        if(computerMove==='rock'){
            result='YOU WIN';
            score.wins+=1;
        }
        else if(computerMove==='paper'){
            result='TIE';
            score.tie+=1;
        }
        else if(computerMove==='scissors'){
            result='YOU LOSE';
            score.loses+=1;
        }
    }

    else if(playermove==='scissors'){
        if(computerMove==='rock'){
            result='YOU LOSE';
            score.loses+=1;
        }
        else if(computerMove==='paper'){
            result='YOU WIN';
            score.wins+=1;
        }
        else if(computerMove==='scissors'){
            result='TIE';
            score.tie+=1;
        }
    }

        Updatescore();

        

        document.querySelector('.js-result')
            .innerHTML=`${result}`;
            
        localStorage.setItem('score',JSON.stringify(score));

        document.querySelector('.js-moves').innerHTML=
            `YOU <img src="images/${playermove}-emoji.png" class="icon-class"> 
            Computer <img src="images/${computerMove}-emoji.png" class="icon-class">`;
        

    }


function getCompMove()
{
    const computerMove=Math.random();
    let compMove;
    if(computerMove>=0&&computerMove<(1/3)){
        compMove='rock';
    }
    else if(computerMove>=(1/3)&&computerMove<(2/3)){
        compMove='paper';
    }
    else{
        compMove='scissors';
    }
    return compMove;
}