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
        },

        totals : {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, des, val) {
        var newItem;

        // Create new ID
        if(data.allItems[type].length > 0) {
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
            ID = 0;
        }

        // Create newItem based on inc or exp type
        if(type === "exp") {
            newItem = new Expense(ID, des, val);
        } else if (type === "inc") {
            newItem = new Income(ID, des, val);
            }

        // We are pushing the new item into our data array, we can use [type] because the properties are matching
        data.allItems[type].push(newItem);
        // Return the new element
        return newItem;
        }
    }
})();


// THE UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        inputType : ".add__type",
        inputDescription : ".add__description",
        inputValue : ".add__value",
        inputButton : ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list"
    }

    return {
        getInput: function() {
            return {
                type : document.querySelector(DOMstrings.inputType).value, //Will be either inc or expense
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value) //We need to use parsefloat to convert it into a number to use later for calculations
            }
        },

        addListItem: function(obj, type) {
            var html, newHTML, element;

            // 1. Create an HTML string with placeholder text
            if(type === "inc") {
                element = DOMstrings.incomeContainer;
            html = '<div class="item clearfix" id="income-&id&"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'} else if(type === "exp") {
                element = DOMstrings.expensesContainer;

            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">10%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'}

            // 2. Replace the placeholder text with real data
            newHTML = html.replace("%id%", obj.id);
            newHTML = newHTML.replace("%description%", obj.description);
            newHTML = newHTML.replace("%value%", obj.value);

            // 3. Insert the HTMl into the DOM
            // getting inserted as a child of the expenses / income containers https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
            document.querySelector(element).insertAdjacentHTML("beforeend", newHTML);
        },

        // Clearing the fields after input
        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);

            // We need to use the array's prototype since the querySelectorAll is only returning a list which has limited methods compare to the arrays
            // We are transforming with the slice into an array
            fieldsArr = Array.prototype.slice.call(fields);

            // Loops through each of the fields and sets back them to empty
            fieldsArr.forEach(function(curr, index, arr) {
                curr.value = "";

            })

            // putting back the focus to the first element
            fieldsArr[0].focus();
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

    var updateBudget = function() {
        // 1. Calculate the new budget

        // 2. Return the budget

        // 3. Display the new budget
    }

    var ctrlAddItem = function() {
        var input, newItem;

        // 1. Get the field input data
        input = UIController.getInput();

        if(input.description !== "" && !isNaN(input.value) && input.value > 0 ) {
        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the new item to the UI
        UICtrl.addListItem(newItem, input.type);

        // Clear the fields
        UICtrl.clearFields();

        // 4. Calculate and update budget

        updateBudget();
        }
    };

    return {
        init: function() {
            console.log("The application has started");
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();
