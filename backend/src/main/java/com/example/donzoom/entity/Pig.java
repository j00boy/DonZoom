package com.example.donzoom.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Pig {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long collectionId;

  private String imageUrl;

  private String collectionName;

  @Builder
  public Pig(String imageUrl, String collectionName){
    this.imageUrl = imageUrl;
    this.collectionName = collectionName;
  }

}
