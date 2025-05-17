document.addEventListener("DOMContentLoaded", () => {
    const quizData = [
        { question: "What is the strongest type of password?", options: ["Short & simple", "A phrase with numbers & symbols", "Your birthdate", "Your pet's name"], correct: 1 },
        { question: "What does MFA stand for?", options: ["Multiple Firewall Access", "Multi-Factor Authentication", "Malicious File Attack", "Masked File Algorithm"], correct: 1 },
        { question: "Which of the following is a sign of a phishing email?", options: ["Generic greetings", "Urgency to act fast", "Suspicious links", "All of the above"], correct: 3 },
        { question: "What should you do if you receive an unexpected email asking for personal info?", options: ["Reply with the info", "Click the link to verify", "Ignore and delete it", "Forward it to everyone"], correct: 2 },
        { question: "What does a firewall do?", options: ["Protects against malware", "Filters incoming and outgoing traffic", "Speeds up the internet", "Creates strong passwords"], correct: 1 },
        { question: "Which of these is the safest way to store passwords?", options: ["Write them down", "Use a password manager", "Use the same password everywhere", "Keep them in a Word document"], correct: 1 },
        { question: "What is ransomware?", options: ["A type of firewall", "A virus that steals passwords", "A malware that locks files and demands payment", "A browser extension"], correct: 2 },
        { question: "Which of the following is the safest public Wi-Fi practice?", options: ["Use a VPN", "Enter sensitive info freely", "Disable security updates", "Use unencrypted connections"], correct: 0 },
        { question: "What should you do before clicking a link in an email?", options: ["Hover over it to check the URL", "Click it immediately", "Reply to the sender", "Ignore it"], correct: 0 },
        { question: "What is the best way to identify a secure website?", options: ["It has HTTPS in the URL", "It has ads", "It looks professional", "It has a long URL"], correct: 0 }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");
    const nextButton = document.getElementById("next-btn");
    const retryButton = document.getElementById("retry-btn");
    const resultsContainer = document.getElementById("results");
    const scoreText = document.getElementById("score-text");

    function loadQuestion() {
        clearOptions();
        let currentQuestion = quizData[currentQuestionIndex];
        questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option");
            button.addEventListener("click", () => checkAnswer(index, currentQuestion.correct));
            optionsContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedIndex, correctIndex) {
        const options = document.querySelectorAll(".option");

        options.forEach((button, index) => {
            button.disabled = true;
            if (index === correctIndex) {
                button.classList.add("correct");
            } else if (index === selectedIndex) {
                button.classList.add("wrong");
            }
        });

        if (selectedIndex === correctIndex) {
            score++;
        }

        nextButton.style.display = "block";
    }

    function clearOptions() {
        optionsContainer.innerHTML = "";
        nextButton.style.display = "none";
    }

    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    function showResults() {
        resultsContainer.style.display = "block";
        scoreText.textContent = `Your Score: ${score} / ${quizData.length}`;
        drawBarChart();
        drawPieChart();
    }

    function drawBarChart() {
        const ctx = document.getElementById("barChart").getContext("2d");
        ctx.fillStyle = "blue";
        ctx.fillRect(50, 200 - score * 20, 50, score * 20);
        ctx.fillStyle = "red";
        ctx.fillRect(150, 200 - (10 - score) * 20, 50, (10 - score) * 20);
    }

    function drawPieChart() {
        const ctx = document.getElementById("pieChart").getContext("2d");
        ctx.beginPath();
        ctx.arc(100, 100, 80, 0, (Math.PI * 2) * (score / 10));
        ctx.lineTo(100, 100);
        ctx.fillStyle = "green";
        ctx.fill();
    }

    function retryQuiz() {
        window.loca();
    }

    loadQuestion();
});
