const form = document.forms.regform;
    const btnNextEx = document.getElementById('next-ex');
    const boxNextEx = document.getElementsByClassName('box-next-ex');

    const textBefore = document.getElementById('text-box__before-text'); 
    const textAfter = document.getElementById('text-box__after-text'); 

    const openNextEx = () => {
        form.style.display = 'none';
        boxNextEx[0].style.display = 'block';
    };


        changeText = () => {
            let str = textBefore.textContent;
            console.log(str);
            textAfter.innerText = str.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2');
        };