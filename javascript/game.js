
$(document).ready(function(){
        
//start game

//generate random number:

let crystalGame = {
    randomNumber: function(min,max){
        let random = Math.floor(Math.random() * (max-min)) + min;
        return random;
    },
    clearGame: function(){
        $("#wins").attr("win-record",0).text(0);
        $("#loses").attr("loss-record",0).text(0);
        $("#bank").attr("bank-total",0).text(0);  
    },
    newGame: function(){
        //new random values for crystals
        $(".btn").each(function(){
             $(this).attr("crystal-value", crystalGame.randomNumber(1,12))
        });
        //new random value for target
        $("#targetValue").attr("target-value", this.randomNumber(19,120));
        let target = $("#targetValue").attr("target-value");
        //reset the scale
        $("#targetValue").text(target);
        $("#crystalSum").attr("value-sum",0).text(null); 
        $(".gem-image-tiny").hide();
        $("#scale-arm").css("transform","rotate(25deg)");
        $("#scale-left").css({"top":5, "left":15});
        $("#scale-right").css({"top":85, "right":20});
        $("#scale-moneybag").css({"top":125, "right":20});
        $(".gem-image-tiny").css("top",70);
        $("#yellow").text(null);
        $("#white").text(null);
        $("#red").text(null);
        $("#blue").text(null);


    },
    playGame: function(){
        let crystalSum = 0, yell = 0, white = 0, red = 0, blue = 0;
        let win = null;
        let loss = null;
        let bankValue = null;
        let armRotate = null;
        
        $(".btn").on("click",function(){
            let targetValue = $("#targetValue").attr("target-value");
        targetValue = parseInt(targetValue);
            let crystalValue = ($(this).attr("crystal-value"));
            crystalValue = parseInt(crystalValue);
            crystalSum += crystalValue;
            $("#crystalSum").text(crystalSum);
            
            //animating the scale
            let armInc = 25-(Math.round((crystalSum/targetValue)*25));
            let leftTop = 45-(Math.round((40/25)*armInc));
            let leftLeft = 10-(Math.round((-5/25)*armInc));
            let rightTop = 45-(Math.round((-40/25)*armInc));
            let rightRight = 10-(Math.round((-10/25)*armInc));
            let moneybagTop = 85-(Math.round((-40/25)*armInc));
            let moneybagRight = 15-(Math.round((-5/25)*armInc));
            let gemTop = 110-(Math.round((40/25)*armInc));
            if(crystalSum>targetValue){
                armInc = -25;
                leftTop = 85;
                leftLeft = 20;
                rightTop = 5;
                rightRight = 15;
                moneybagTop = 40;
                moneybagRight = 10;
                gemTop = 150;
               } 
            armRotate = "rotate("+armInc+"deg)";
            $("#scale-arm").css("transform",armRotate);
            $("#scale-left").css({"top":leftTop, "left":leftLeft});
            $("#scale-right").css({"top":rightTop, "right":rightRight});
            $("#scale-moneybag").css({"top":moneybagTop, "right":moneybagRight});
            $(".gem-image-tiny").css("top",gemTop);
            
            //add tiny crystals for effect
            let tinyCrystal = $(this).attr("Id");
            tinyCrystal=tinyCrystal.replace("gem-","");
           
            switch(tinyCrystal){
            case ("yellow"):
            yell+=1;
            $("#scale-yellow").show();
            $("#yellow").text(yell);
            break;
            case("white"):
            white+=1;
            $("#scale-white").show();
            $("#white").text(white);
            break;
            case("red"):
            red+=1
            $("#scale-red").show();
            $("#red").text(red);
            break;
            case("blue"):
            blue+=1;
            $("#scale-blue").show();
            $("#blue").text(blue);
            break;
            }
            
            //Evaluate win/loss
            if(targetValue===crystalSum){
                win +=1;
                bankValue += crystalSum;
                $("#wins").attr("win-record",win).text(win);
                $("#bank").attr("bank-total",bankValue).text(bankValue); 
                crystalGame.newGame()
                crystalSum = 0, yell = 0, white = 0, red = 0, blue = 0;;

            } else{if(crystalSum>targetValue){
                loss+=1;
                bankValue-= crystalSum;
                if(bankValue<0){bankValue=0};
                $("#loses").attr("loss-record",loss).text(loss);
                $("#bank").attr("bank-total",bankValue).text(bankValue);
                crystalGame.newGame()
                crystalSum = 0, yell = 0, white = 0, red = 0, blue = 0;;

            }}
        }); 
        
    }
}


crystalGame.clearGame();
crystalGame.newGame();
crystalGame.playGame();

})