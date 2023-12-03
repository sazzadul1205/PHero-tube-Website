// btn-input
const btnCall = async (n) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const buttons = data.data;
    const content = buttons[n];
    displayBtn(content);
    document.getElementById(content.category_id).addEventListener('click', () => {
        generateCards(content.category_id);
    });
    if (content.category_id === '1000') {
        document.getElementById('1000').click();
    }
}

const displayBtn = (button) => {
    const btnContainer = document.getElementById('btn-container');
    const btn = document.createElement('div');
    btn.innerHTML = `
    <button id="${button.category_id}" class="inline-flex px-5 py-1 justify-center items-center gap-2 bg-[#25252526] text-[#252525] font-medium active:bg-[#FF1F3D] active:text-[#FFFF] toggle-btn"  onclick="toggle('${button.category_id}')">${button.category}</button>
    `
    btnContainer.appendChild(btn);
}

for (let i = 0; i < 4; i++) {
    btnCall(i);
}

// btn-recognition

const toggle = (buttonId) => {
    const buttons = document.querySelectorAll('.toggle-btn');
    buttons.forEach(button => {
        button.classList.remove('bg-[#FF1F3D]', 'text-[#FFFF]');
        button.classList.add('bg-[#25252526]', 'text-[#252525]');
    });

    const activeButton = document.getElementById(buttonId);
    activeButton.classList.remove('bg-[#25252526]', 'text-[#252525]');
    activeButton.classList.add('bg-[#FF1F3D]', 'text-[#FFFF]');
}
// btn-recognition end


const blogButton = document.getElementById('blog-button');


blogButton.addEventListener('click', () => {
    window.location.href = 'blog.html';
});
