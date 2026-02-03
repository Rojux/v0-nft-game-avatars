'use client';

import { useState } from 'react';
import { AvatarTraits, AVATAR_CLASSES, SKIN_COLORS, HAIR_COLORS, EYE_COLORS, ACCESSORIES, BACKGROUNDS, generateRandomAvatar, generateAvatarName } from '@/lib/avatar-generator';
import { AvatarPreview } from './avatar-preview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shuffle } from 'lucide-react';

interface AvatarCustomizerProps {
  onConfirm: (traits: AvatarTraits, name: string) => void;
  isLoading?: boolean;
}

export function AvatarCustomizer({ onConfirm, isLoading = false }: AvatarCustomizerProps) {
  const [traits, setTraits] = useState<AvatarTraits>(generateRandomAvatar());
  const [avatarName, setAvatarName] = useState<string>(generateAvatarName());

  const selectedClass = AVATAR_CLASSES.find(
    c => c.name.toLowerCase() === traits.class
  );

  const handleRandomize = () => {
    setTraits(generateRandomAvatar());
    setAvatarName(generateAvatarName());
  };

  const handleTraitChange = (key: keyof AvatarTraits, value: string | string[]) => {
    setTraits(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Avatar Preview</CardTitle>
          <CardDescription>Customize your unique gaming avatar</CardDescription>
        </CardHeader>
        <CardContent>
          <AvatarPreview traits={traits} />
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Avatar Name</span>
            <Button
              onClick={handleRandomize}
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Shuffle className="w-4 h-4" />
              Randomize
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            value={avatarName}
            onChange={(e) => setAvatarName(e.target.value)}
            placeholder="Enter avatar name"
            maxLength={20}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-sm text-muted-foreground mt-2">
            {avatarName.length}/20 characters
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Customize Traits</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="class" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-muted">
              <TabsTrigger value="class">Class</TabsTrigger>
              <TabsTrigger value="skin">Skin</TabsTrigger>
              <TabsTrigger value="hair">Hair</TabsTrigger>
              <TabsTrigger value="eyes">Eyes</TabsTrigger>
              <TabsTrigger value="more">More</TabsTrigger>
            </TabsList>

            <TabsContent value="class" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {AVATAR_CLASSES.map(cls => (
                  <button
                    key={cls.id}
                    onClick={() => handleTraitChange('class', cls.name.toLowerCase())}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      traits.class === cls.name.toLowerCase()
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card/30 hover:border-primary/50'
                    }`}
                  >
                    <div className="font-semibold text-foreground">{cls.name}</div>
                    <p className="text-sm text-muted-foreground mt-1">{cls.description}</p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {Object.entries(cls.stats).map(([stat, value]) => (
                        <Badge key={stat} variant="secondary" className="text-xs">
                          {stat.charAt(0).toUpperCase() + stat.slice(1)}: {value}
                        </Badge>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skin" className="space-y-4 mt-6">
              <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                {SKIN_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => handleTraitChange('skinColor', color)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all ${
                      traits.skinColor === color
                        ? 'border-primary scale-110'
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hair" className="space-y-4 mt-6">
              <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                {HAIR_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => handleTraitChange('hairColor', color)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all ${
                      traits.hairColor === color
                        ? 'border-primary scale-110'
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="eyes" className="space-y-4 mt-6">
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                {EYE_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => handleTraitChange('eyeColor', color)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all ${
                      traits.eyeColor === color
                        ? 'border-primary scale-110'
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="more" className="space-y-6 mt-6">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-foreground">Accessories</h3>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {ACCESSORIES.map(acc => (
                    <button
                      key={acc.id}
                      onClick={() => {
                        if (traits.accessories.includes(acc.id)) {
                          handleTraitChange('accessories', traits.accessories.filter(a => a !== acc.id));
                        } else {
                          handleTraitChange('accessories', [acc.id]);
                        }
                      }}
                      className={`p-2 rounded-lg border-2 text-sm transition-all ${
                        traits.accessories.includes(acc.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-card/30 hover:border-primary/50'
                      }`}
                    >
                      {acc.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3 text-foreground">Background</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {BACKGROUNDS.map(bg => (
                    <button
                      key={bg.id}
                      onClick={() => handleTraitChange('background', bg.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        traits.background === bg.id
                          ? 'border-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-full h-20 rounded bg-gradient-to-br ${bg.gradient} mb-2`} />
                      <p className="text-xs font-medium text-foreground">{bg.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button
          onClick={handleRandomize}
          variant="outline"
          className="flex-1 gap-2 bg-transparent"
          disabled={isLoading}
        >
          <Shuffle className="w-4 h-4" />
          Randomize All
        </Button>
        <Button
          onClick={() => onConfirm(traits, avatarName)}
          className="flex-1"
          disabled={isLoading || avatarName.trim().length === 0}
        >
          {isLoading ? 'Creating...' : 'Create Avatar'}
        </Button>
      </div>
    </div>
  );
}
