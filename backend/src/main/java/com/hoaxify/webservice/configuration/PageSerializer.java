package com.hoaxify.webservice.configuration;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.domain.Page;

import java.io.IOException;

// Tüm kullanıcıları istenilen formatta cevap olarak dönmek için kullanılan bir yöntemdir.
// Örnek olması amacıyla yaptık, bu işlemi view model kullanarak halledeceğiz.
@JsonComponent
public class PageSerializer extends JsonSerializer<Page<?>> {
    @Override
    public void serialize(Page<?> objects, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeFieldName("content");
        serializerProvider.defaultSerializeValue(objects.getContent(), jsonGenerator);
        jsonGenerator.writeObjectField("pageable", objects.getPageable());
        jsonGenerator.writeBooleanField("last", objects.isLast());
        jsonGenerator.writeNumberField("totalPages", objects.getTotalPages());
        jsonGenerator.writeNumberField("totalElement", objects.getTotalElements());
        jsonGenerator.writeNumberField("size", objects.getSize());
        jsonGenerator.writeNumberField("number", objects.getNumber());
        jsonGenerator.writeNumberField("numberOfElements", objects.getNumberOfElements());
        jsonGenerator.writeBooleanField("first", objects.isFirst());
        jsonGenerator.writeBooleanField("empty", objects.isEmpty());
        jsonGenerator.writeEndObject();
    }
}
