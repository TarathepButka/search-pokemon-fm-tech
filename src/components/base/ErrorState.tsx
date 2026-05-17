"use client";

import { RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ErrorStateProps = {
  title?: string;
  description: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Something went wrong",
  description,
  onRetry,
}: ErrorStateProps) {
  return (
    <Card className="border-destructive/30 bg-destructive/5">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <p>{description}</p>
        {onRetry ? (
          <Button onClick={onRetry} variant="outline">
            <RefreshCcw className="mr-2 size-4" />
            Retry
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
