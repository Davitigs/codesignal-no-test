// worker.ts
self.addEventListener('message', (event) => {
  const { size, timerInterval, additionalIds } = event.data;
  let data = generatePseudoSocketData(size);

  // Apply additional IDs if provided
  for (let i = 0; i < additionalIds.length && i < size; i++) {
    data[i].id = additionalIds[i];
  }

  self.postMessage(data);

  // Set up the timer to send data at the specified interval
  setInterval(() => {
    data = generatePseudoSocketData(size);

    // Apply additional IDs if provided
    for (let i = 0; i < additionalIds.length && i < size; i++) {
      data[i].id = additionalIds[i];
    }

    self.postMessage(data);
  }, timerInterval);
});

function generatePseudoSocketData(size: number = 50): any[] {
  // Implement your logic to generate pseudo-socket data here
  // Use the specified structure for each array element
  // For simplicity, I'll generate random data

  const data = [];
  for (let i = 0; i < size; i++) {
    const element = {
      id: `ID${i}`,
      int: Math.floor(Math.random() * 100),
      float: Math.random().toPrecision(18),
      color: getRandomColor(),
      child: {
        id: `ChildID${i}`,
        color: getRandomColor(),
      },
    };
    data.push(element);
  }
  return data;
}

function getRandomColor(): string {
  // Implement your logic to generate random colors here
  // For simplicity, I'll return a random hex color
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
