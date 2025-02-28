import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
import { Notification } from '@jupyterlab/apputils';
import {
  stopIcon,
  refreshIcon,
  fastForwardIcon
} from '@jupyterlab/ui-components';

const CommandIds = {
  Interrupt: 'jupyter-libyt:interrupt',
  Restart: 'jupyter-libyt:restart',
  RestartRunAll: 'jupyter-libyt:restart-run-all'
};

/**
 * Initialization data for the jupyter-libyt extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-libyt:plugin',
  description: 'A JupyterLab extension for libyt.',
  autoStart: true,
  requires: [INotebookTracker],
  activate: (app: JupyterFrontEnd, tracker: INotebookTracker) => {
    console.log('[jupyter_libyt] frontend extension activated', app);

    const { commands } = app;

    // Add behavior to interrupt
    commands.addCommand(CommandIds.Interrupt, {
      label: 'Interrupt',
      caption: 'Interrupt the kernel',
      icon: stopIcon,
      execute: () => {
        let kernel_name =
          tracker.currentWidget?.context.sessionContext?.session?.kernel?.name;
        if (kernel_name === 'libyt_kernel') {
          Notification.warning(
            'Interrupt the kernel is not supported in jupyter-libyt',
            { autoClose: 3000 }
          );
        } else {
          commands.execute('kernelmenu:interrupt');
        }
      }
    });

    // Add behavior to restart
    commands.addCommand(CommandIds.Restart, {
      label: 'Restart',
      caption: 'Restart the kernel',
      icon: refreshIcon,
      execute: () => {
        let kernel_name =
          tracker.currentWidget?.context.sessionContext?.session?.kernel?.name;
        if (kernel_name === 'libyt_kernel') {
          Notification.warning(
            'Restart the kernel is not supported in jupyter-libyt',
            { autoClose: 3000 }
          );
        } else {
          commands.execute('kernelmenu:restart');
        }
      }
    });

    // Add behavior to restart and run all
    commands.addCommand(CommandIds.RestartRunAll, {
      label: 'Restart and run all cells',
      caption: 'Restart the kernel and run all cells',
      icon: fastForwardIcon,
      execute: () => {
        let kernel_name =
          tracker.currentWidget?.context.sessionContext?.session?.kernel?.name;
        if (kernel_name === 'libyt_kernel') {
          Notification.warning(
            'Restart the kernel and run all cells is not supported in jupyter-libyt',
            { autoClose: 3000 }
          );
        } else {
          commands.execute('notebook:restart-run-all');
        }
      }
    });
  }
};

export default plugin;
