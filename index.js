// Jogo desenvolvido:
// Copyright 2019 - Danilson Veloso de Sousa.

var game;
var players = [];

players[0] = {
    name: 'Jogador X',
    xo: 'x',
    value: 0,
    score: 0
};

players[1] = {
    name: 'Jogador O',
    xo: 'o',
    value: 1,
    score: 0
};

game = {
    player: 0,
    total: 0,
    sequence: [['','',''],['','',''],['','','']],
    total: 0,
    tie: false,
    start: function () {
        this.reset();
        $('#player0 .name').text(players[0].name);
        $('#player1 .name').text(players[1].name);
        $('.player').removeClass('on');
        $('#player' + this.player).addClass('on');
        $('.try-again').removeClass('on');
    },

    update: function () {
        for (var i = 0; i < 3;i++) {

            //Horizontal match
            if (this.sequence[i][0] === players[this.player].value && 
                this.sequence[i][1] === players[this.player].value && 
                this.sequence[i][2] === players[this.player].value) {

                    $('.match').attr('class','match on h row-' + i);
                    this.match();
                    return true;

            //Vertical match
            } else if (this.sequence[0][i] === players[this.player].value && 
                        this.sequence[1][i] === players[this.player].value && 
                        this.sequence[2][i] === players[this.player].value) {
                
                        $('.match').attr('class','match on v col-' + i);

                        this.match();
                        return true;
            
            //Diagonal left
            } else if (this.sequence[0][0] === players[this.player].value && 
                        this.sequence[1][1] === players[this.player].value && 
                        this.sequence[2][2] === players[this.player].value) {
        
                        $('.match').attr('class','match on diag-0');

                        this.match();
                        return true;

            //Diagonal right
            } else if (this.sequence[0][2] === players[this.player].value && 
                        this.sequence[1][1] === players[this.player].value && 
                        this.sequence[2][0] === players[this.player].value) {
        
                        $('.match').attr('class','match on diag-1');

                        this.match();
                        return true;
            } else {
                if (this.total === 9) {

                    $('.try-again').addClass('on');
                    this.tie = true;
                }
            }
            
        }

    },

    match: function () {
        players[this.player].score++;
        this.message(players[this.player].name + " ganhou!");
        
        $('#player' + this.player + ' .score').text(players[this.player].score);
        $('.try-again').addClass('on');
    },

    reset: function () {
        $('.item').text('');
        $('.match').removeClass('on');
        this.sequence = [['','',''],['','',''],['','','']];
        this.tie = false;
        this.total = 0;
    },

    play: function (domItem) {

        this.update();

        $('.player').removeClass('on');

        if ($(domItem).text().trim() === '') {

            $(domItem).text(players[this.player].xo);
            
            if (this.player == 0) {
                this.player = 1;
            } else {
                this.player = 0;
            }

            $('#player' + this.player).addClass('on');
            $(domItem).addClass('rotate');
            this.total++;
            
        } else { 
            this.message('O oponente já marcou esse quadro!');
        }
        
        var rowIndex = $(domItem).attr('data-row');
        var itemIndex = $(domItem).attr('data-index');
        this.sequence[rowIndex][itemIndex] = players[this.player].value;

        this.update();

        //Empate
        if (this.tie) {
            this.message('Deu empate!');
            $('.player .score').text(players[0].score += 1);
        }
    },

    message: function (text) {
        $('.game-popup').addClass('on');
        $('.game-message').text(text);

        $(document).on('click', '.game-popup', function () {
            $(this).removeClass('on');
        });
    }
    
};


$(document).ready(function () {
    game.start();
    $(document).on('click', '.item', function () {
        game.play(this);
    });
    $(document).on('click', '#try', function () {
        game.start();
    });
});