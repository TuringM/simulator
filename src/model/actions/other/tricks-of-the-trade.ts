import { CraftingAction } from '../crafting-action';
import { Simulation } from '../../../simulation/simulation';
import { ActionType } from '../action-type';
import { CraftingJob } from '../../crafting-job.enum';

export class TricksOfTheTrade extends CraftingAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 13 };
  }

  public getType(): ActionType {
    return ActionType.CP_RECOVERY;
  }

  _canBeUsed(simulationState: Simulation, linear = false): boolean {
    if (linear) {
      return true;
    }
    if (simulationState.safe) {
      return false;
    }
    return simulationState.state === 'GOOD' || simulationState.state === 'EXCELLENT';
  }

  execute(simulation: Simulation, safe: boolean): void {
    if (!safe) {
      simulation.availableCP += 20;
      if (simulation.availableCP > simulation.maxCP) {
        simulation.availableCP = simulation.maxCP;
      }
    }
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 0;
  }

  getIds(): number[] {
    return [100371, 100372, 100373, 100374, 100375, 100376, 100377, 100378];
  }

  getSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getDurabilityCost(simulationState: Simulation): number {
    return 0;
  }
}
