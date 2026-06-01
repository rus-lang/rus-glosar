// Фильтрация терминов по категориям
const filterButtons = document.querySelectorAll('.filter-btn');
const termCards = document.querySelectorAll('.term-card');
const searchInput = document.getElementById('searchInput');

// Фильтрация по категориям
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        termCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const matchesFilter = filterValue === 'all' || cardCategory === filterValue;
            const searchTerm = searchInput.value.toLowerCase();
            const matchesSearch = searchTerm === '' || 
                card.querySelector('h3').textContent.toLowerCase().includes(searchTerm) ||
                card.querySelector('p').textContent.toLowerCase().includes(searchTerm);
            
            if (matchesFilter && matchesSearch) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => card.classList.add('hidden'), 300);
            }
        });
    });
});

// Поиск по терминам
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    
    termCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const category = card.getAttribute('data-category');
        
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        const matchesFilter = activeFilter === 'all' || category === activeFilter;
        
        if (matchesSearch && matchesFilter) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => card.classList.add('hidden'), 300);
        }
    });
});

// Анимация появления карточек при загрузке
window.addEventListener('load', () => {
    termCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
});

// Обработка кнопок "Подробнее"
const detailButtons = document.querySelectorAll('.details-btn');

detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.term-card');
        const term = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        
        // Создаём модальное окно
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>${term}</h2>
                <p>${description}</p>
                <div class="modal-footer">
                    <button class="modal-btn">Понятно</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => modal.classList.add('show'), 10);
        
        // Закрытие модального окна
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-btn').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    });
});

// Добавляем стили для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
    
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 14, 39, 0.9);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 1rem;
    }
    
    .modal.show {
        opacity: 1;
    }
    
    .modal-content {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        padding: 2.5rem;
        max-width: 600px;
        width: 100%;
        position: relative;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .modal.show .modal-content {
        transform: scale(1);
    }
    
    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 2rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .modal-close:hover {
        background: rgba(255, 255, 255, 0.1);
        color: var(--accent-primary);
    }
    
    .modal-content h2 {
        color: var(--text-primary);
        margin-bottom: 1rem;
        font-size: 2rem;
    }
    
    .modal-content p {
        color: var(--text-secondary);
        line-height: 1.8;
        margin-bottom: 2rem;
    }
    
    .modal-footer {
        display: flex;
        justify-content: flex-end;
    }
    
    .modal-btn {
        padding: 0.75rem 2rem;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        color: white;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        font-family: inherit;
        transition: all 0.3s ease;
    }
    
    .modal-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 212, 255, 0.4);
    }
`;
document.head.appendChild(style);