document.addEventListener("DOMContentLoaded", () => {
    const journalEntry = document.getElementById("journalEntry");
    const analyzeMoodBtn = document.getElementById("analyzeMood");
    const clearBtn = document.getElementById("clearJournal");
    const homeBtn = document.getElementById("homeButton");
    const moodResult = document.getElementById("moodResult");
    const moodMessage = document.getElementById("moodMessage");
    const upliftingContent = document.getElementById("upliftingContent");

    analyzeMoodBtn.addEventListener("click", () => {
        const text = journalEntry.value.trim();
        if (text === "") {
            moodResult.innerHTML = "Please enter some text to analyze.";
            moodMessage.innerHTML = "";
            upliftingContent.innerHTML = "";
            return;
        }

        const moodAnalysis = analyzeMood(text);
        generateMoodInsight(moodAnalysis);
    });

    clearBtn.addEventListener("click", () => {
        journalEntry.value = "";
        moodResult.innerHTML = "";
        moodMessage.innerHTML = "";
        upliftingContent.innerHTML = "";
    });

    homeBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    function analyzeMood(text) {
        const words = text.toLowerCase().split(/\s+/);

        const moodWords = {
            happy: ["happy", "joy", "excited", "love", "great", "amazing", "fun", "cheerful", "delighted", "ecstatic", "grateful", "good", "wonderful", "pleased"],
            sad: ["sad", "depressed", "unhappy", "cry", "bad", "lonely", "heartbroken", "miserable", "gloomy", "down"],
            angry: ["angry", "mad", "frustrated", "upset", "hate", "irritated", "furious", "annoyed", "resentful", "bitter"],
            calm: ["calm", "peaceful", "relaxed", "serene", "content", "tranquil", "mindful", "soothing", "quiet", "still"]
        };

        let counts = { happy: 0, sad: 0, angry: 0, calm: 0 };

        words.forEach(word => {
            Object.keys(moodWords).forEach(mood => {
                if (moodWords[mood].includes(word)) {
                    counts[mood]++;
                }
            });
        });

        return counts;
    }

    function generateMoodInsight(moodAnalysis) {
        const { happy, sad, angry, calm } = moodAnalysis;
        let insight = "";
        let suggestion = "";

        if (happy > sad && happy > angry && happy > calm) {
            insight = "You seem to be in a joyful mood today! Keep spreading positivity! 😊";
            suggestion = "✨ Try sharing your happiness with a friend, listening to your favorite song, or dancing to upbeat music! 🎶";
        } else if (sad > happy && sad > angry && sad > calm) {
            insight = "It looks like you're feeling a bit down. Remember, it's okay to feel this way. Take care of yourself. 💙";
            suggestion = "🌸 Try watching a comforting movie, going for a short walk, or writing down three things you're grateful for.";
        } else if (angry > happy && angry > sad && angry > calm) {
            insight = "You're feeling frustrated. Take a deep breath, relax, and try to let go of the tension. 😌";
            suggestion = "🎧 Try deep breathing exercises, stretching, or listening to calming music to cool down.";
        } else if (calm > happy && calm > sad && calm > angry) {
            insight = "You're feeling peaceful and at ease. Enjoy this moment of calmness. 🌿";
            suggestion = "🍃 Enhance this feeling by meditating, sitting in nature, or enjoying a warm cup of tea.";
        } else if (happy > 0 && calm > 0 && happy >= calm) {
            insight = "You're experiencing both happiness and peace. Stay in this positive vibe! ✨";
            suggestion = "🌞 Capture this moment in a journal, take a mindful walk, or do something creative!";
        } else if (sad > 0 && calm > 0 && sad >= calm) {
            insight = "You're feeling a mix of sadness and calmness. Reflect on your thoughts and take it easy. 💜";
            suggestion = "☕ Light a scented candle, drink some warm tea, or hug someone you love for comfort.";
        } else {
            insight = "Your emotions seem mixed. Keep writing and expressing yourself, it's a great way to understand your feelings. 📝";
            suggestion = "🎨 Take a break, listen to your favorite song, or doodle something fun to uplift your mood!";
        }

        if (moodMessage && upliftingContent) {
            moodMessage.innerHTML = `<strong>${insight}</strong>`;
            upliftingContent.innerHTML = `<p>${suggestion}</p>`;
        }
    }
});
axios.post('http://127.0.0.1:5000/signup', { username, email, password })
.then(response => console.log(response.data))
.catch(error => console.error(error));
function openJournal() {
    window.open('journal.html', '_blank');
}
document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;

    const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    alert(data.message || data.error);
});

