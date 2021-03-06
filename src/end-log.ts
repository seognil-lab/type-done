import chalk from 'chalk';
import figures from 'figures';

type Logger = (arg: {
  deprecated: string[];
  unused: string[];
  useful: string[];
}) => void;

const b = (dep: string) => chalk.bold(dep);

export const logAnalyzedList: Logger = ({ deprecated, unused, useful }) => {
  // * ---------------- log uninstall list

  deprecated
    .filter((e) => !unused.includes(e))
    .forEach((dep) => {
      console.log(
        chalk.red(
          figures.arrowLeft,
          `${b(dep)} is deprecated. Needs to uninstall`,
        ),
      );
    });

  unused.forEach((dep) => {
    console.log(
      chalk.red(figures.arrowLeft, `${b(dep)} is unused. Needs to uninstall`),
    );
  });

  // * ---------------- log install list

  useful.forEach((dep) => {
    console.log(
      chalk.green(
        figures.arrowRight,
        `${b(dep)} is missing. Waiting for install`,
      ),
    );
  });
};
