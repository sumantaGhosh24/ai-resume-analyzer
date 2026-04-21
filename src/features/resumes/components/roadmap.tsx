"use client";

import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {
  Roadmap as RoadmapTypes,
  RoadmapPhase,
  RoadmapTask,
} from "@/generated/prisma/client";

interface RoadmapProps extends RoadmapTypes {
  phases: (RoadmapPhase & {tasks: RoadmapTask[]})[];
}

const Roadmap = ({roadmap}: {roadmap: RoadmapProps}) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader>
        <CardTitle>Roadmap</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto whitespace-pre-line leading-relaxed space-y-3 text-sm text-foreground/90">
        <div className="space-y-4">
          <h2 className="font-bold text-lg">{roadmap.title}</h2>
          <p>
            <span className="font-semibold">Duration:</span> {roadmap.duration}
          </p>
          {roadmap.phases && roadmap.phases.length > 0 ? (
            <div className="space-y-6">
              {roadmap.phases.map((phase) => (
                <div key={phase.id} className="pl-4 border-l-4 border-muted">
                  <h3 className="font-semibold text-base">{phase.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    <span className="font-semibold">Duration:</span>{" "}
                    {phase.duration}
                  </p>
                  {phase.tasks && phase.tasks.length > 0 ? (
                    <ol className="list-decimal ml-6 space-y-2">
                      {phase.tasks.map((task) => (
                        <li key={task.id} className="flex flex-col">
                          <span>{task.task}</span>
                          {task.resource && (
                            <span className="text-xs text-muted-foreground italic">
                              Resource: {task.resource}
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-muted-foreground italic">
                      No tasks available for this phase.
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">
              No phases available in this roadmap.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Roadmap;
