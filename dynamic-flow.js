// ...existing code...

let score = 0  // ← LÄGG TILL denna variabel

function showQuestion() {
    const question = filteredQuestions[currentQuestionIndex]
    if (question) {
        const questionContainer = document.createElement("h2")
        questionContainer.textContent = `Fråga ${currentQuestionIndex + 1}: ${question.question}`  // ← ÄNDRA denna rad
        mainContainer.appendChild(questionContainer)
        
        let answerSelected = false
        const answerDiv = document.createElement("div")

        question.answers.forEach((answer, index) => {  // ← LÄGG TILL index parameter
            const answerButton = document.createElement("button")
            answerButton.textContent = answer
            answerButton.addEventListener("click", () => {
                // ← LÄGG TILL denna logik:
                if (index === question.correctAnswer) {
                    score++
                    console.log("Rätt svar! Poäng:", score)
                } else {
                    console.log("Fel svar!")
                }
                
                answerSelected = true
                nextButton.disabled = false
            })
            answerDiv.appendChild(answerButton)
        })
        mainContainer.appendChild(answerDiv)

        const stepDiv = document.createElement("div")

        const previousButton = document.createElement("button")
        previousButton.textContent = "Föregående fråga"
        previousButton.disabled = currentQuestionIndex === 0
        previousButton.addEventListener("click", () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--
                clearMainContainer()
                showQuestion()
            }
        })
        stepDiv.appendChild(previousButton)

        const nextButton = document.createElement("button")
        nextButton.textContent = "Nästa fråga"
        nextButton.disabled = true
        nextButton.addEventListener("click", (e) => {
            currentQuestionIndex++
            clearMainContainer()
            
            // ← LÄGG TILL denna kontroll:
            if (currentQuestionIndex >= filteredQuestions.length) {
                showResults()  // Visa resultat istället
            } else {
                showQuestion()
            }
        })
        stepDiv.appendChild(nextButton)
        mainContainer.appendChild(stepDiv)
    } else {
        showResults()  // ← ÄNDRA från "Out of questions..." till showResults()
    }
}

// ← LÄGG TILL denna nya funktion:
function showResults() {
    mainContainer.innerHTML = `
        <h2>Quiz Slutfört!</h2>
        <p>Du fick ${score} av ${filteredQuestions.length} rätt!</p>
        <button onclick="location.reload()">Spela igen</button>
    `
}

// ...existing code...