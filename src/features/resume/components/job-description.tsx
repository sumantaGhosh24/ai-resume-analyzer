"use client";

import {PrimaryBadge} from "@/components/primary-badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ScrollArea} from "@/components/ui/scroll-area";

import {useSuspenseResume} from "../hooks/use-resume";

interface JobDescriptionProps {
  resumeId: string;
}

const JobDescription = ({resumeId}: JobDescriptionProps) => {
  const {data: resume} = useSuspenseResume(resumeId);

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader>
        <CardTitle>Job Description</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto whitespace-pre-line leading-relaxed space-y-3 text-sm text-foreground/90">
        <p>{resume.analysis?.job?.content}</p>
        <Tabs defaultValue="required-skills" className="mt-5">
          <TabsList className="flex-wrap mb-10">
            <TabsTrigger value="required-skills">Required Skills</TabsTrigger>
            <TabsTrigger value="preferred-skills">Preferred Skills</TabsTrigger>
            <TabsTrigger value="responsibilities">Responsibilities</TabsTrigger>
            <TabsTrigger value="seniority">Seniority</TabsTrigger>
          </TabsList>
          <TabsContent value="required-skills">
            {resume?.analysis &&
            resume?.analysis?.job?.requiredSkills.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {resume.analysis.job.requiredSkills.map((skill) => (
                  <PrimaryBadge key={skill.id}>{skill.name}</PrimaryBadge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center pt-2">
                No required skills listed for this job
              </p>
            )}
          </TabsContent>
          <TabsContent value="preferred-skills">
            {resume?.analysis &&
            resume?.analysis?.job?.preferredSkills.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {resume.analysis.job.preferredSkills.map((skill) => (
                  <PrimaryBadge key={skill.id}>{skill.name}</PrimaryBadge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center pt-2">
                No preferred skills listed for this job
              </p>
            )}
          </TabsContent>
          <TabsContent value="responsibilities">
            {resume?.analysis &&
            resume?.analysis?.job?.responsibilities.length > 0 ? (
              <ScrollArea className="h-[300px]">
                <ul className="list-disc list-inside space-y-1 mt-2">
                  {resume.analysis.job.responsibilities.map(
                    (resp: {id: string; content: string}) => (
                      <li key={resp.id}>{resp.content}</li>
                    ),
                  )}
                </ul>
              </ScrollArea>
            ) : (
              <p className="text-muted-foreground text-center pt-2">
                No responsibilities listed for this job
              </p>
            )}
          </TabsContent>
          <TabsContent value="seniority">
            <div className="mt-2">
              {resume?.analysis?.job?.seniority ? (
                <PrimaryBadge>{resume.analysis.job.seniority}</PrimaryBadge>
              ) : (
                <p className="text-muted-foreground">
                  No seniority specified for this job
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default JobDescription;
