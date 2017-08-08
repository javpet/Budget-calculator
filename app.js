// We create an IIFE to create a separate scope
// The controllers don't know about each other


// THE BUDGETCONTROLLER
var budgetController = (function () {

    //Function constructor
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        
        allItems : {
            exp : [],
            inc: []
        }
        totals : {
            exp: 0,
            inc: 0
        }
    }

})();


// THE UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        inputType : ".add__type",
        inputDescription : ".add__description",
        inputValue : ".add__value",
        inputButton : ".add__btn"
    }

    return {
        getInput: function() {
            return {
                type : document.querySelector(DOMstrings.inputType).value, //Will be either inc or expense
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : document.querySelector(DOMstrings.inputValue).value
            }
        },

        getDOMStrings: function() {
            return DOMstrings //exposing DOMstrings into the public for other controllers to use
        }
    }
})();

// THE GLOBAL APP CONTROLLER
// This controller knows about the other 2 and connects them
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners  = function() {
            var DOM = UIController.getDOMStrings()

            document.querySelector(DOM.inputButton).addEventListener("click", ctrlAddItem);

            document.addEventListener("keypress", function(event){
                // If someone hits enter we also need to apply the value
                if(event.keyCode === 13) {
                    ctrlAddItem();
                }
            });
    };

    var DOM = UIController.getDOMStrings()

    var ctrlAddItem = function() {
        // 1. Get the field input data
        var input = UIController.getInput();
        console.log(input);


        // 2. Add the item to the budget controller
        // 3. Add the new item to the UI
        // 4. Calculate the new budget
        // 5. Display the new budget
    };

    return {
        init: function() {
            console.log("The application has started");
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();
