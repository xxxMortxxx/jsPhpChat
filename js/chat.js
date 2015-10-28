/**
 * Created by à on 25.10.2015.
 */
function Chat(id){

    var self = this;
    this.id=id;
    this.mainDiv = $("#"+this.id);
    this.chatArea = this.mainDiv.find('.chatArea');
    this.chatWrap = this.mainDiv.find('.chatWrap');
    this.nickname=this.mainDiv.find(".name");
    this.instance=false;
    this.state=0;
    this.chatDiv=this.mainDiv.find(".sendie");
    this.dialog =  this.mainDiv.find(".dialog").dialog({
        //autoOpen:false,
        height:300,
        width:400,
        modal:true,
        buttons:{
            Enter:function() {
                //alert(self);
            self.enterName();
            },
            Cancel:function(){self.dialog.dialog('close')}
        }
    });

    this.scrollDown=function(){
        console.log(this.chatWrap.prop('scrollHeight')-this.chatWrap.height());
        this.chatWrap.animate({scrollTop:this.chatWrap.prop('scrollHeight')-this.chatWrap.height()},1000);
    }
    //this.init=init;
    this.send=function (nickname,msg){
        var self = this;

        $.ajax({
            type:'POST',
            url:'php/process.php',
            dataType:'json',
            data:{'function':'send','nickname':nickname,'message':msg},
            success:function(){

                self.update();

            }

        })
    };
    this.update= function(){
            var self = this;

            if(!this.instance){
                this.instance=true;
                $.ajax({
                    type:'POST',
                    url:'php/process.php',
                    data:{'function':'update'},
                    dataType:'json',
                    success:function(data){
                        console.log("success update request");
                        self.state=data.state;
                        self.chatArea.html(data.text);
                        self.scrollDown();

                    }
                });
            }
            this.instance=false;
        };

    this.checkForUpdate= function(){
        if(!this.instance){
            this.instance=true;
            $.ajax({
                type:'POST',
                url:'php/process.php',
                data:{'function':'check','state':this.state},
                dataType:'json',
            });
        }
    };


    this.init=function(){

        var self = this;

        this.chatDiv
            .keydown(function(event){
                var key = event.which;

                if(key>=33){
                    var maxLength=self.chatDiv.attr('maxLength');
                    var length=self.chatDiv.val().length;

                    if(length>=maxLength){
                        event.preventDefault();
                    }

                }

            })
            .keyup(function(e){
                if(e.keyCode==13){
                    var text = self.chatDiv.val();
                    var maxLength = self.chatDiv.attr('maxLength');
                    var length = text.length;

                    if(length<maxLength){
                        self.send(self.nickname.val(),text);

                        self.chatDiv.val(' ');
                    }else{
                        self.chatDiv.val(text.substring(0,maxLength));
                    }
                }

            });
        $(this.id+" .submit").on('click',function(){console.log('hello')});
        alert($("#ChatModule .submit").html());
        this.update();




    }

    this.enterName=function(){
        if(!this.nickname.val()){
            this.nickname.val('guest');
        }
        var name = self.nickname.val();
        self.mainDiv.find(".greeting").text("You logged as "+name);
        self.dialog.dialog('close')

    }







}
