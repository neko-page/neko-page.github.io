document.addEventListener('DOMContentLoaded', () => {
    const categoryContainer = document.getElementById('categoryContainer');
    const toolsGrid = document.getElementById('toolsGrid');
    const searchInput = document.getElementById('searchInput');

    let currentCategory = 'all';

    // 1. 渲染分类标签
    function renderCategories() {
        const allButton = document.createElement('button');
        allButton.className = 'cat-tag active';
        allButton.textContent = '全部';
        allButton.setAttribute('data-category', 'all');
        categoryContainer.appendChild(allButton);

        TOOLS_CONFIG.forEach(category => {
            const button = document.createElement('button');
            button.className = 'cat-tag';
            button.textContent = category.categoryName;
            button.setAttribute('data-category', category.categoryId);
            categoryContainer.appendChild(button);
        });

        document.querySelectorAll('.cat-tag').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.cat-tag').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.getAttribute('data-category');
                renderTools();
            });
        });
    }

    // 2. 渲染工具卡片
    function renderTools() {
        toolsGrid.innerHTML = '';
        const searchText = searchInput.value.toLowerCase().trim();

        TOOLS_CONFIG.forEach(category => {
            if (currentCategory !== 'all' && currentCategory !== category.categoryId) {
                return;
            }

            category.tools.forEach(tool => {
                if (searchText && 
                    !tool.name.toLowerCase().includes(searchText) && 
                    !tool.description.toLowerCase().includes(searchText)) {
                    return;
                }

                const card = document.createElement('a');
                card.className = 'tool-card';
                card.href = tool.link;
                card.target = '_blank';           // ⭐ 新窗口打开
                card.rel = 'noopener noreferrer'; // ⭐ 安全最佳实践

                card.innerHTML = `
                    <div class="tool-info">
                        <h3>${tool.name}</h3>
                        <p>${tool.description}</p>
                    </div>
                `;

                toolsGrid.appendChild(card);
            });
        });

        if (toolsGrid.children.length === 0) {
            toolsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--text-sub);">
                    <p style="font-size: 1.2rem;">没有找到匹配的工具</p>
                    <p>试试其他关键词或分类</p>
                </div>
            `;
        }
    }

    searchInput.addEventListener('input', renderTools);

    renderCategories();
    renderTools();
});
