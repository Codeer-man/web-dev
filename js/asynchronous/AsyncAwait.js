const preheatoven = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const preheated = true;

      if (preheated) {
        resolve("Preheated successfully");
      } else {
        reject("Preheating failed");
      }
    }, 1000);
  });
};

const addsugerandchokochip = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const addchock = true;

      if (addchock) {
        resolve("Addchock successfully");
      } else {
        reject("Addchock failed");
      }
    }, 1000);
  });
};
const addflourandchoko = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const addsalt = true;

      if (addsalt) {
        resolve("Add some salt and sugar in it");
      } else {
        reject("Addchock failed");
      }
    }, 1000);
  });
};
const bakemixture = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const bakemixture = true;

      if (bakemixture) {
        resolve("Bake for 24mins");
      } else {
        reject("faild task");
      }
    }, 1000);
  });
};

const bakechocolate = async () => {
  try {
    const taskone = await preheatoven();
    console.log(taskone);
    const tasktwo = await addsugerandchokochip();
    console.log(tasktwo);
    const taskthree = await addflourandchoko();
    console.log(taskthree);
    const taskfour = await bakemixture();
    console.log(taskfour);
  } catch (error) {
    console.error("something went wrong");
  }
};

bakechocolate();
