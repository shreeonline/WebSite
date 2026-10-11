
(function () {
  // Prevent the chatbot from being added more than once.
  if (document.getElementById("shree-chat-widget")) return;

  const styles = `
    #shree-chat-widget {
      position: fixed;
      right: 22px;
      bottom: 20px;
      z-index: 99999;
      font-family: Arial, sans-serif;
    }
    #shree-chat-toggle {
      background: #0756a8;
      color: white;
      border: none;
      border-radius: 50%;
      width: 62px;
      height: 62px;
      font-size: 28px;
      cursor: pointer;
      box-shadow: 0 4px 14px #0003;
    }
    #shree-chat-panel {
      display: none;
      position: absolute;
      right: 0;
      bottom: 75px;
      width: 340px;
      max-width: calc(100vw - 32px);
      height: 440px;
      background: white;
      border-radius: 14px;
      box-shadow: 0 5px 28px #0003;
      overflow: hidden;
      border: 1px solid #ddd;
    }
    #shree-chat-header {
      background: #0756a8;
      color: white;
      padding: 15px;
      font-weight: bold;
    }
    #shree-chat-header small {
      display: block;
      font-weight: normal;
      margin-top: 5px;
    }
    #shree-chat-messages {
      height: 285px;
      overflow-y: auto;
      padding: 12px;
      background: #f5f7fb;
    }
    .shree-message {
      padding: 10px 12px;
      margin: 8px 0;
      border-radius: 12px;
      max-width: 88%;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      font-size: 14px;
      line-height: 1.45;
    }
    .shree-bot {
      background: white;
      border: 1px solid #e3e6eb;
      color: #222;
    }
    .shree-user {
      background: #d8eaff;
      margin-left: auto;
      color: #123;
    }
    #shree-chat-form {
      display: flex;
      gap: 6px;
      padding: 10px;
      background: white;
    }
    #shree-chat-input {
      flex: 1;
      min-width: 0;
      padding: 11px;
      border: 1px solid #ccc;
      border-radius: 8px;
      outline-color: #0756a8;
    }
    #shree-chat-send {
      background: #0756a8;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 0 14px;
      cursor: pointer;
    }
    .shree-quick {
      margin: 3px;
      padding: 7px 9px;
      border: 1px solid #0756a8;
      background: white;
      color: #0756a8;
      border-radius: 16px;
      cursor: pointer;
      font-size: 12px;
    }
    @media (max-width: 400px) {
      #shree-chat-widget { right: 12px; bottom: 12px; }
      #shree-chat-panel { width: calc(100vw - 24px); }
    }
  `;

  const style = document.createElement("style");
  style.textContent = styles;
  document.head.appendChild(style);

  const widget = document.createElement("div");
  widget.id = "shree-chat-widget";
  widget.innerHTML = `
    <section id="shree-chat-panel" aria-label="Shree Online chatbot">
      <div id="shree-chat-header">
        Shree Online Services
        <small>Training and internship assistant</small>
      </div>
      <div id="shree-chat-messages" aria-live="polite"></div>
      <div style="padding: 3px 8px;">
        <button class="shree-quick" data-q="What courses do you offer?">Courses</button>
        <button class="shree-quick" data-q="Tell me about internships">Internships</button>
        <button class="shree-quick" data-q="How can I contact you?">Contact</button>
      </div>
      <form id="shree-chat-form">
        <input id="shree-chat-input" type="text"
          placeholder="Ask about our courses..." aria-label="Your question"
          autocomplete="off" required />
        <button id="shree-chat-send" type="submit">Send</button>
      </form>
    </section>
    <button id="shree-chat-toggle"
      aria-label="Open chat" aria-expanded="false">💬</button>
  `;
  document.body.appendChild(widget);

  const panel = widget.querySelector("#shree-chat-panel");
  const toggle = widget.querySelector("#shree-chat-toggle");
  const messages = widget.querySelector("#shree-chat-messages");
  const form = widget.querySelector("#shree-chat-form");
  const input = widget.querySelector("#shree-chat-input");

  function addMessage(text, who) {
    const item = document.createElement("div");
    item.className = "shree-message " +
      (who === "user" ? "shree-user" : "shree-bot");
    // textContent prevents user input from being interpreted as HTML.
    item.textContent = text;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
  }

  function getAnswer(question) {
    const q = question.toLowerCase();

    if (/hello|hi\b|hey|namaste/.test(q)) {
      return "Hello! Welcome to Shree Online Services. How can I help you with courses or internships?";
    }

    if (/course|training|learn|teach|program/.test(q)) {
      return "We offer training in:\n• Salesforce CRM, Admin and Development\n• Salesforce Lightning and Integration\n• Python and Data Science\n• Data Analytics and Power BI\n• Java Programming\n• SQL, Oracle and NoSQL\n• Software Testing\n• Web Development (HTML, CSS, PHP)\n• Big Data, Docker, GitHub and Cloud Computing\n\nPlease contact us for the latest course details and fees.";
    }

    if (/intern|placement|job|career/.test(q)) {
      return "Our website lists internship programs in Salesforce, Python/Data Science and Machine Learning, Database/Oracle, Web Development, and Cloud Computing. Placement assistance is offered as part of our training support. Contact us to check current batches and eligibility.";
    }

    if (/salesforce|apex|lwc|crm/.test(q)) {
      return "We provide Salesforce CRM and Development training, including Salesforce Lightning and Integration. Contact us to ask about Admin, Development, project practice and certification guidance.";
    }

    if (/python|data science|machine learning|analytics|power bi/.test(q)) {
      return "We offer Python, Data Science and Machine Learning training, along with Data Analytics and Power BI. Contact us for syllabus, duration, fees and the next batch.";
    }

    if (/cloud|devops|docker|github|big data/.test(q)) {
      return "We provide technology training covering Cloud Computing, Docker, GitHub and Big Data-related topics. Please contact us for current course availability and details.";
    }

    if (/fee|fees|price|cost|duration|batch|timing|certificate/.test(q)) {
      return "Course fees, schedules and certification details may vary by program. Please call 9665928883 or email shreeonlinelearning@gmail.com for the latest information.";
    }

    if (/contact|phone|mobile|call|email|address|location|where/.test(q)) {
      return "Contact Shree Online Services:\nPhone: 9665928883\nEmail: shreeonlinelearning@gmail.com\n\nLocations listed on our website:\n• Sahyog Nagar, Wardha\n• Hingna, Nagpur\n• Dudulgaon, Moshi-Alandi Road, Pune\n\nWebsite: https://shreeonline.github.io/WebSite/";
    }

    if (/register|admission|join|enrol/.test(q)) {
      return "You can explore the courses on our website and contact us to confirm current admissions. The website also has a 'Register Here' link for registration.";
    }

    return "Thank you for your question! I can help with our courses, Salesforce training, internships, Python, Data Analytics, Cloud Computing and contact details. For anything else, please call 9665928883 or email shreeonlinelearning@gmail.com.";
  }

  function ask(question) {
    const clean = question.trim();
    if (!clean) return;
    addMessage(clean, "user");
    addMessage(getAnswer(clean), "bot");
  }

  toggle.addEventListener("click", function () {
    const isOpen = panel.style.display === "block";
    panel.style.display = isOpen ? "none" : "block";
    toggle.textContent = isOpen ? "💬" : "✕";
    toggle.setAttribute("aria-expanded", String(!isOpen));

    if (!isOpen && messages.childElementCount === 0) {
      addMessage(
        "Hello! Welcome to Shree Online Services. Ask me about courses, internships or contact details.",
        "bot"
      );
      input.focus();
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    ask(input.value);
    input.value = "";
    input.focus();
  });

  widget.querySelectorAll(".shree-quick").forEach(function (button) {
    button.addEventListener("click", function () {
      ask(button.dataset.q);
    });
  });
})();
