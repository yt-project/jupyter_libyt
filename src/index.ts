import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
import { Notification } from '@jupyterlab/apputils';
import {
  stopIcon,
  refreshIcon,
  fastForwardIcon,
  LabIcon
} from '@jupyterlab/ui-components';

type JupyterLibytCommandWrapper = {
  command_id: string;
  label: string;
  caption: string;
  icon: LabIcon;
  libyt_execute: () => void;
  jupyter_execute: (app: JupyterFrontEnd) => void;
};

const CommandIds: JupyterLibytCommandWrapper[] = [
  {
    command_id: 'jupyter-libyt:interrupt',
    label: 'Interrupt',
    caption: 'Interrupt the kernel',
    icon: stopIcon,
    libyt_execute: () => {
      Notification.warning(
        'Interrupt the kernel is not supported in jupyter-libyt',
        { autoClose: 3000 }
      );
    },
    jupyter_execute: (app: JupyterFrontEnd) => {
      app.commands.execute('kernelmenu:interrupt');
    }
  },
  {
    command_id: 'jupyter-libyt:restart',
    label: 'Restart',
    caption: 'Restart the kernel',
    icon: refreshIcon,
    libyt_execute: () => {
      Notification.warning(
        'Restart the kernel is not supported in jupyter-libyt',
        { autoClose: 3000 }
      );
    },
    jupyter_execute: (app: JupyterFrontEnd) => {
      app.commands.execute('kernelmenu:restart');
    }
  },
  {
    command_id: 'jupyter-libyt:restart-run-all',
    label: 'Restart and run all cells',
    caption: 'Restart the kernel and run all cells',
    icon: fastForwardIcon,
    libyt_execute: () => {
      Notification.warning(
        'Restart the kernel and run all cells is not supported in jupyter-libyt',
        { autoClose: 3000 }
      );
    },
    jupyter_execute: (app: JupyterFrontEnd) => {
      app.commands.execute('notebook:restart-run-all');
    }
  }
];

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

    // Add JupyterLibytCommands behavior
    CommandIds.forEach(command => {
      commands.addCommand(command.command_id, {
        label: command.label,
        caption: command.caption,
        icon: command.icon,
        execute: () => {
          let kernel_name =
            tracker.currentWidget?.context.sessionContext?.session?.kernel
              ?.name;
          if (kernel_name === 'libyt_kernel') {
            command.libyt_execute();
          } else {
            command.jupyter_execute(app);
          }
        }
      });
    });
  }
};

export default plugin;
