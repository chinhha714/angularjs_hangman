var app = angular.module("HangmanApp", []);
//MV* 
app.controller("GameController", ['$scope', '$timeout', function($scope, $timeout) {
    var words = ["rat", "cat1", "bat12", "mat123"];
    
    $scope.incorrectLetters = [];
    $scope.correctLetters = [];
    $scope.guesses = 6;
    $scope.displayWord = '';
    $scope.input = {
        letter : ''
    }
    
    var selectRandomWord = function() {
        var index = Math.round(Math.random() * words.length);
        return words[index];        
    }
    
    var newGame = function() {
        $scope.incorrectLetters = [];
        $scope.correctLetters = [];
        $scope.guesses = 6;
        $scope.displayWord = '';
        
        selectedWord = selectRandomWord();
        console.log(selectedWord);
        var tempDisplayWord = '';
        for(var i = 0; i < selectedWord.length; i++) {
            tempDisplayWord += '*';
        }
        $scope.displayWord = tempDisplayWord;
    }
    
    $scope.letterChosen = function() {
        for (var i = 0; i < $scope.correctLetters.length; i++) {
            if($scope.correctLetters[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
                $scope.input.letter = "";
                return;
            }
        }
        
        for (var i = 0; i < $scope.incorrectLetters.length; i++) {
            if($scope.incorrectLetters[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
                $scope.input.letter = "";
                return;
            }
        }
            
        /*
            cat
            ***
            a
            *a*
        */
        var correct = false;
        for (var i = 0; i < selectedWord.length; i++) {
            if(selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
                $scope.displayWord = $scope.displayWord.slice(0,i) +
                                     $scope.input.letter.toLowerCase() +
                                     $scope.displayWord.slice(i + 1);
                correct = true;
            }
        }    
            
        if(correct) {
            $scope.correctLetters.push($scope.input.letter.toLowerCase());
        } else {
            $scope.guesses--;
            $scope.incorrectLetters.push($scope.input.letter.toLowerCase());
        }    
                    
        $scope.input.letter = "";  
        
        if($scope.guesses == 0) {
            alert("You have lost!");
            $timeout(function() {
                newGame();
            }, 500);
        }
        
        if($scope.displayWord.indexOf("*") == -1) {
            alert("You won!");
        }
            
    }
    
    newGame();
    
}]);