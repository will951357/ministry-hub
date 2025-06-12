
import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Users, X } from "lucide-react";
import { toast } from "sonner";

// Sample members data - this would come from your API
const availableMembers = [
  { id: 1, name: "Ana Silva", email: "ana.silva@example.com", phone: "(555) 111-2222" },
  { id: 2, name: "Carlos Santos", email: "carlos.s@example.com", phone: "(555) 222-3333" },
  { id: 3, name: "Maria Oliveira", email: "maria.o@example.com", phone: "(555) 333-4444" },
  { id: 4, name: "João Pereira", email: "joao.p@example.com", phone: "(555) 444-5555" },
  { id: 5, name: "Luiza Costa", email: "luiza.c@example.com", phone: "(555) 555-6666" },
  { id: 6, name: "Pedro Almeida", email: "pedro.a@example.com", phone: "(555) 666-7777" },
  { id: 7, name: "Fernanda Lima", email: "fernanda.l@example.com", phone: "(555) 777-8888" },
  { id: 8, name: "Roberto Dias", email: "roberto.d@example.com", phone: "(555) 888-9999" }
];

const roles = [
  { value: "leader", label: "Líder" },
  { value: "assistant", label: "Auxiliar" },
  { value: "member", label: "Membro" }
];

interface InvitedMember {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface InviteMembersSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
  hasLeader?: boolean;
}

export function InviteMembersSheet({ isOpen, onOpenChange, groupName, hasLeader = false }: InviteMembersSheetProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [invitedMembers, setInvitedMembers] = useState<InvitedMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  const filteredMembers = availableMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !invitedMembers.some(invited => invited.id === member.id)
  );

  const addMember = () => {
    if (!selectedMember || !selectedRole) {
      toast.error("Selecione um membro e uma função");
      return;
    }

    // Verificar se já existe um líder
    if (selectedRole === "leader" && (hasLeader || invitedMembers.some(m => m.role === "leader"))) {
      toast.error("Apenas um membro pode ser líder do grupo");
      return;
    }

    const member = availableMembers.find(m => m.id === parseInt(selectedMember));
    if (member) {
      setInvitedMembers(prev => [...prev, {
        id: member.id,
        name: member.name,
        email: member.email,
        role: selectedRole
      }]);
      setSelectedMember("");
      setSelectedRole("");
    }
  };

  const removeMember = (memberId: number) => {
    setInvitedMembers(prev => prev.filter(m => m.id !== memberId));
  };

  const sendInvitations = () => {
    if (invitedMembers.length === 0) {
      toast.error("Adicione pelo menos um membro para convidar");
      return;
    }

    // Aqui você faria a chamada para a API
    toast.success(`${invitedMembers.length} convite(s) enviado(s) para o grupo "${groupName}"`);
    
    // Limpar e fechar
    setInvitedMembers([]);
    setSearchQuery("");
    setSelectedMember("");
    setSelectedRole("");
    onOpenChange(false);
  };

  const getRoleLabel = (role: string) => {
    return roles.find(r => r.value === role)?.label || role;
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "leader": return "default";
      case "assistant": return "secondary";
      default: return "outline";
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Users size={20} />
            Convidar Membros
          </SheetTitle>
          <SheetDescription>
            Convide membros para o grupo "{groupName}" e defina suas funções.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Buscar membros */}
          <div className="space-y-2">
            <Label>Buscar Membros</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Digite o nome do membro..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Selecionar membro e função */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Membro</Label>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  {filteredMembers.map(member => (
                    <SelectItem key={member.id} value={member.id.toString()}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Função</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem 
                      key={role.value} 
                      value={role.value}
                      disabled={role.value === "leader" && (hasLeader || invitedMembers.some(m => m.role === "leader"))}
                    >
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={addMember} className="w-full">
            Adicionar Membro
          </Button>

          {/* Lista de membros convidados */}
          {invitedMembers.length > 0 && (
            <div className="space-y-3">
              <Label>Membros Convidados ({invitedMembers.length})</Label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {invitedMembers.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.email}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getRoleBadgeVariant(member.role)}>
                        {getRoleLabel(member.role)}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMember(member.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botões de ação */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={sendInvitations} className="flex-1">
              Enviar Convites
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
