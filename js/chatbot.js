/**
 * chatbot.js - Funcionalidad del chatbot para Leon Digital
 */

document.addEventListener('DOMContentLoaded', function() {
    initChatbot();
});

/**
 * Inicializa la funcionalidad del chatbot
 */
function initChatbot() {
    // Crear el HTML del chatbot
    createChatbotHTML();
    
    // Obtener referencias a los elementos del chatbot
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-send');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    // Mostrar/ocultar el chatbot al hacer clic en el botón
    chatbotToggle.addEventListener('click', function() {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            // Mostrar mensaje de bienvenida si es la primera vez
            if (chatbotMessages.children.length === 0) {
                setTimeout(() => {
                    addBotMessage('¡Hola! Soy el asistente virtual de Leon Digital. ¿En qué puedo ayudarte hoy?');
                }, 500);
            }
            chatbotInput.focus();
        }
    });
    
    // Cerrar el chatbot
    chatbotClose.addEventListener('click', function() {
        chatbotWindow.classList.remove('active');
    });
    
    // Enviar mensaje al presionar Enter
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && chatbotInput.value.trim() !== '') {
            sendMessage();
        }
    });
    
    // Enviar mensaje al hacer clic en el botón de enviar
    chatbotSend.addEventListener('click', function() {
        if (chatbotInput.value.trim() !== '') {
            sendMessage();
        }
    });
    
    /**
     * Envía un mensaje del usuario y procesa la respuesta
     */
    function sendMessage() {
        const message = chatbotInput.value.trim();
        
        // Añadir mensaje del usuario
        addUserMessage(message);
        
        // Limpiar input
        chatbotInput.value = '';
        
        // Mostrar indicador de escritura
        showTypingIndicator();
        
        // Simular respuesta del bot (en una aplicación real, aquí iría la llamada a la API)
        setTimeout(() => {
            // Ocultar indicador de escritura
            hideTypingIndicator();
            
            // Procesar la respuesta según el mensaje
            processResponse(message);
        }, 1500);
    }
    
    /**
     * Procesa la respuesta del bot según el mensaje del usuario
     */
    function processResponse(message) {
        message = message.toLowerCase();
        
        // Add language detection
        const language = detectLanguage(message);
        
        // Add sentiment analysis
        const sentiment = analyzeSentiment(message);
        
        // Add context awareness
        const context = getConversationContext();
        
        // Use enhanced local responses for all queries
        provideLocalResponse(message, sentiment, context);
    }
    
    // Claude API integration removed temporarily
    
    /**
     * Proporciona respuestas locales mejoradas para consultas comunes
     */
    function provideLocalResponse(message, sentiment, context) {
        // Respuestas más naturales y conversacionales
        if (message.includes('hola') || message.includes('buenos días') || message.includes('buenas')) {
            const greetings = [
                '¡Hola! ¿Cómo puedo ayudarte hoy con tu proyecto digital?',
                '¡Qué tal! Soy el asistente virtual de Leon Digital. ¿En qué te puedo ayudar?',
                '¡Hola! Es un placer saludarte. ¿Qué te trae por aquí hoy?'
            ];
            addBotMessage(greetings[Math.floor(Math.random() * greetings.length)]);
        } 
        else if (message.includes('servicios') || message.includes('qué ofrecen')) {
            addBotMessage('En Leon Digital nos especializamos en transformar negocios a través de la tecnología. Ofrecemos servicios de marketing digital, diseño web, y soluciones de IA como chatbots personalizados y automatización de procesos. ¿Te gustaría conocer más sobre alguno de estos servicios en particular?');
        }
        else if (message.includes('chatbot') || message.includes('bot')) {
            addBotMessage('¡Estás hablando con uno ahora mismo! 😊 Nuestros chatbots están diseñados para mejorar la experiencia de tus clientes, responder preguntas frecuentes y estar disponibles 24/7. ¿Te interesa implementar uno para tu negocio?');
        }
        else if (message.includes('precio') || message.includes('costo') || message.includes('tarifa')) {
            if (sentiment === 'negative') {
                addBotMessage('Entiendo tu preocupación por los costos. Nuestros precios están diseñados para adaptarse a diferentes presupuestos y necesidades. ¿Te parece bien que un asesor te contacte para ofrecerte una solución personalizada?');
            } else {
                addBotMessage('Cada proyecto es único, por eso nuestros precios se ajustan a tus necesidades específicas. Podemos crear un paquete personalizado que se adapte a tu presupuesto. ¿Te gustaría que te contactemos para darte más detalles?');
            }
        }
        else if (message.includes('contacto') || message.includes('hablar') || message.includes('asesor')) {
            addBotMessage('¡Claro! Puedes contactarnos a través del formulario en nuestra página de contacto, o si prefieres una respuesta más rápida, llámanos al +46 760 600 917. También puedo pedirle a uno de nuestros asesores que te llame. ¿Qué opción te resulta más cómoda?');
        }
        else if (message.includes('gracias') || message.includes('thank')) {
            const thanks = [
                '¡Es un placer ayudarte! ¿Hay algo más en lo que pueda asistirte?',
                'No hay de qué. Estamos para hacer tu experiencia digital más sencilla. ¿Necesitas algo más?',
                '¡Gracias a ti por contactarnos! Si tienes más preguntas, no dudes en escribirme.'
            ];
            addBotMessage(thanks[Math.floor(Math.random() * thanks.length)]);
        }
        else if (message.includes('adiós') || message.includes('chao') || message.includes('hasta luego')) {
            addBotMessage('¡Hasta pronto! Ha sido un placer charlar contigo. Recuerda que estamos disponibles cuando nos necesites. ¡Que tengas un excelente día!');
        }
        else {
            // Si no entendemos la consulta específica
            if (sentiment === 'negative') {
                addBotMessage('Lamento no entender completamente tu consulta. Para poder ayudarte mejor, ¿podrías ser un poco más específico sobre lo que estás buscando? Estoy aquí para asistirte con información sobre nuestros servicios o agendar una consulta personalizada.');
            } else {
                addBotMessage('Gracias por tu mensaje. Para brindarte la mejor asistencia, ¿podrías darme más detalles sobre lo que estás buscando? Puedo ayudarte con información sobre marketing digital, diseño web, soluciones de IA, o agendar una consulta con nuestro equipo de expertos.');
            }
        }
    }
    
    /**
     * Añade un mensaje del usuario al chat
     */
    function addUserMessage(text) {
        const message = document.createElement('div');
        message.className = 'message message-user message-new';
        
        // Add message content
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = text;
        
        // Add timestamp
        const timestamp = document.createElement('div');
        timestamp.className = 'message-timestamp';
        timestamp.textContent = getCurrentTime();
        
        // Add status indicator
        message.classList.add('sent');
        
        // Append elements
        message.appendChild(messageContent);
        message.appendChild(timestamp);
        
        chatbotMessages.appendChild(message);
        scrollToBottom();
        
        // Simulate message delivery status
        setTimeout(() => {
            message.classList.remove('sent');
            message.classList.add('delivered');
        }, 1000);
    }
    
    function addBotMessage(text) {
        const message = document.createElement('div');
        message.className = 'message message-bot message-new';
        
        // Add message content
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Process text to add emojis and formatting
        text = enhanceMessageText(text);
        
        // Use innerHTML to support formatting if needed
        messageContent.innerHTML = text;
        
        // Add timestamp
        const timestamp = document.createElement('div');
        timestamp.className = 'message-timestamp';
        timestamp.textContent = getCurrentTime();
        
        // Append elements
        message.appendChild(messageContent);
        message.appendChild(timestamp);
        
        chatbotMessages.appendChild(message);
        scrollToBottom();
    }
    
    /**
     * Mejora el texto del mensaje con emojis y formato
     */
    function enhanceMessageText(text) {
        // Replace common phrases with more natural versions including emojis
        text = text.replace(/¡Hola!/g, '¡Hola! 👋');
        text = text.replace(/gracias/gi, 'gracias 🙏');
        text = text.replace(/excelente/gi, 'excelente ✨');
        
        // Add emphasis to important parts
        if (text.includes('contacto')) {
            text = text.replace(/\+46 760 600 917/g, '<strong>+46 760 600 917</strong>');
        }
        
        return text;
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }
    
    /**
     * Muestra el indicador de escritura
     */
    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.id = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            typingIndicator.appendChild(dot);
        }
        
        const chatbotMessages = document.querySelector('.chatbot-messages');
        chatbotMessages.appendChild(typingIndicator);
        scrollToBottom();
    }
    
    /**
     * Oculta el indicador de escritura
     */
    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    /**
     * Desplaza el chat hacia abajo
     */
    function scrollToBottom() {
        const chatbotMessages = document.querySelector('.chatbot-messages');
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
}

/**
 * Crea el HTML del chatbot y lo añade al body
 */
function createChatbotHTML() {
    const chatbotHTML = `
        <div class="chatbot-container">
            <div class="chatbot-toggle animate-bounceIn">
                <img src="../images/LEON DIGITAL - LOGO solo cara.png" alt="Chatbot" class="robot-float">
            </div>
            <div class="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-title">
                        <img src="../images/LEON DIGITAL - LOGO solo cara.png" alt="Chatbot">
                        <h3>Asistente Leon Digital</h3>
                    </div>
                    <div class="chatbot-close">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <div class="chatbot-messages"></div>
                <div class="chatbot-input">
                    <input type="text" placeholder="Escribe tu mensaje aquí...">
                    <div class="chatbot-send">
                        <i class="fas fa-paper-plane"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
}

function detectLanguage(text) {
    // Simple language detection
    const spanishPatterns = ['hola', 'gracias', 'buenos días', 'adiós', 'qué', 'cómo'];
    const englishPatterns = ['hello', 'thanks', 'good morning', 'bye', 'what', 'how'];
    
    let spanishCount = 0;
    let englishCount = 0;
    
    text = text.toLowerCase();
    
    spanishPatterns.forEach(pattern => {
        if (text.includes(pattern)) spanishCount++;
    });
    
    englishPatterns.forEach(pattern => {
        if (text.includes(pattern)) englishCount++;
    });
    
    return spanishCount >= englishCount ? 'es' : 'en';
}

function analyzeSentiment(text) {
    // Basic sentiment analysis
    const positiveWords = ['gracias', 'excelente', 'bueno', 'genial', 'me gusta', 'perfecto'];
    const negativeWords = ['malo', 'problema', 'error', 'queja', 'difícil', 'complicado'];
    
    text = text.toLowerCase();
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    positiveWords.forEach(word => {
        if (text.includes(word)) positiveScore++;
    });
    
    negativeWords.forEach(word => {
        if (text.includes(word)) negativeScore++;
    });
    
    if (positiveScore > negativeScore) return 'positive';
    if (negativeScore > positiveScore) return 'negative';
    return 'neutral';
}

function getConversationContext() {
    // Get messages from the chat
    const messages = document.querySelectorAll('.message');
    const previousMessages = [];
    
    messages.forEach(msg => {
        const isBot = msg.classList.contains('message-bot');
        previousMessages.push({
            text: msg.textContent,
            sender: isBot ? 'bot' : 'user'
        });
    });
    
    // Determine current topic based on recent messages
    let currentTopic = '';
    const lastUserMessages = previousMessages.filter(m => m.sender === 'user').slice(-2);
    
    if (lastUserMessages.some(m => m.text.includes('precio') || m.text.includes('costo'))) {
        currentTopic = 'pricing';
    } else if (lastUserMessages.some(m => m.text.includes('servicio'))) {
        currentTopic = 'services';
    }
    
    return {
        previousMessages,
        currentTopic,
        userPreferences: {}
    };
}