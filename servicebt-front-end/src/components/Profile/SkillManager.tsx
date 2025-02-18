"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coffee, PlusCircle as Plus, X } from "lucide-react";
import apiClient from "@/app/lib/apiClient";
import Loading from "../Shared/Loading";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const ProfileSkills = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/api/v1/users/profile/");
      setSkills(response.data.profile.skills); 
    } catch (error) {
      setError("Failed to load skills. Please try again later.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load skills. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const validateSkill = (skillName: string) => {
    if (!skillName.trim()) {
      return "Skill name cannot be empty";
    }
    if (skills.some(skill => skill.toLowerCase() === skillName.toLowerCase())) {
      return "This skill already exists";
    }
    return null;
  };

  // Handle adding a new skill
  const handleAddSkill = async () => {
    const validationError = validateSkill(newSkill);
    if (validationError) {
      toast({
        variant: "destructive",
        title: "Invalid Skill",
        description: validationError,
      });
      return;
    }

    setIsAddingSkill(true);
    setError(null);
    try {
      const response = await apiClient.get("/api/v1/users/profile/"); 
      const currentProfile = response.data;

      // Add the new skill to the existing skills array
      const updatedSkills = [...skills, newSkill.trim()];

      // Update the skills array by sending the updated list to the backend
      await apiClient.put("/api/v1/users/profile/", {
        ...currentProfile,
        profile: {
          ...currentProfile.profile,
          skills: updatedSkills
        }
      });

      setSkills(updatedSkills);
      setNewSkill(""); 
      setIsDialogOpen(false); 
      toast({
        title: "Success",
        description: "Skill added successfully",
      });
    } catch (error) {
      setError("Failed to add skill. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add skill. Please try again.",
      });
    } finally {
      setIsAddingSkill(false);
    }
  };

  // Handle removing a skill
  const handleRemoveSkill = async (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);

    setError(null);
    try {
      const response = await apiClient.get("/api/v1/users/profile/"); 
      const currentProfile = response.data;

      // Update the skills array by sending the updated list to the backend
      await apiClient.put("/api/v1/users/profile/", {
        ...currentProfile,
        profile: {
          ...currentProfile.profile,
          skills: updatedSkills
        }
      });

      setSkills(updatedSkills);
      toast({
        title: "Success",
        description: "Skill removed successfully",
      });
    } catch (error) {
      setError("Failed to remove skill. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove skill. Please try again.",
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2 text-orange-500">
              <Plus className="h-4 w-4 text-orange-500" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Enter skill name"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
              />
              <Button 
                onClick={handleAddSkill} 
                disabled={isAddingSkill || !newSkill.trim()}
              >
                {isAddingSkill ? "Adding..." : "Add Skill"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <Loading />
      ) : skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="flex items-center gap-1 pr-2">
              {skill}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleRemoveSkill(skill)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      ) : (
        <><Coffee className="w-16 h-16 mx-auto mb-4 text-orange-500 opacity-50 text-center" /><p className="w-auto h-16 mx-auto mb-4 text-orange-500 opacity-50 text-center">No skills added yet.</p></>
      )}
    </Card>
  );
};

export default ProfileSkills;
