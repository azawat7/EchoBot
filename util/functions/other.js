module.exports = {
  async *loadFiles(dir) {
    const files = await readdir(dir);
    for (const file of files) {
      const pathToFile = join(dir, file);
      const isDirectory = (await stat(pathToFile)).isDirectory();
      if (isDirectory) {
        yield* loadFiles(pathToFile);
      } else {
        yield pathToFile;
      }
    }
  },
};
