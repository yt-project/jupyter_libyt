import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
import { Notification } from '@jupyterlab/apputils';
import { stopIcon } from '@jupyterlab/ui-components';


const CommandIds = {
  Interrupt: 'jupyter-libyt:interrupt'
}

/**
 * Initialization data for the jupyter-libyt extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-libyt:plugin',
  description: 'A JupyterLab extension for libyt.',
  autoStart: true,
  requires: [INotebookTracker],
  activate: (app: JupyterFrontEnd, tracker: INotebookTracker) => {
    console.log("[jupyter_libyt] frontend extension activated", app);

    const { commands } = app;

    // Add behavior to interrupt
    commands.addCommand(CommandIds.Interrupt, {
      label: 'Interrupt',
      caption: 'Interrupt the kernel',
      icon: stopIcon,
      execute: () => {
        // Libyt Kernel
        let kernel_name = tracker.currentWidget?.context.sessionContext?.session?.kernel?.name;
        if (kernel_name === 'libyt_kernel') {
          Notification.warning('Interrupt is disabled in jupyter libyt', {autoClose: 3000});
        } else {
          commands.execute("kernelmenu:interrupt");
        }
      }
    });
  }
};

export default plugin;
