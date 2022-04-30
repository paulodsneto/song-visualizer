
const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
let audioSource;
let analyser;

container.addEventListener('click', function(){
    const audio1 = document.getElementById('audio1');
    const audioContext = new AudioContext();
    audio1.play();
    audioSource = audioContext.createMediaElementSource(audio1)
    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = 15;
    let barHeight;
    let x;
    
    function animate(){
        x = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }
    animate();
});

file.addEventListener('change', function() {
    const files = this.files;
    const audio1 = document.getElementById('audio1');
    audio1.src = URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play();
    audioSource = audioContext.createMediaElementSource(audio1)
    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = 15;
    let barHeight;
    let x;
    
    function animate(){
        x = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }
    animate();
});

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
    for (let i = 0; i < bufferLength; i++){
        barHeight = dataArray[i] * 1.5;
        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(i * Math.PI * 10 / bufferLength);
        const hue = i + 234 / 1.5;
        context.fillStyle = 'hsl(' + hue + ',36%, 60%)';
        context.fillRect(0, 0, barWidth, barHeight);
        x += barWidth;
        context.restore();
    }
}